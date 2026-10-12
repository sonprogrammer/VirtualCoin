/**
 * @vitest-environment jsdom
 */
import type { PriceData } from "./useWebSocket"
import { act, cleanup, render, screen } from "@testing-library/react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AxiosResponse } from "axios";
import { CoinPrice } from "../context/CoinPrice";
import axiosInstance from "./useGetRefresh";
import useWebSocket from "./useWebSocket";

vi.mock("./useGetRefresh", () => ({
  default: { get: vi.fn() }
}));

class MockWebSocket {
  static instances: MockWebSocket[] = [];
  onopen: (() => void) | null = null;
  onmessage: ((event: MessageEvent) => void) | null = null;
  onclose: (() => void) | null = null;
  close = vi.fn();

  open() {
    this.onopen?.()
  }

  disconnect() {
    this.onclose?.()
  }

  constructor() {
    MockWebSocket.instances.push(this);
  }

  receive(code: string, trade_price: number, timestamp: number) {
    this.onmessage?.({
      data: JSON.stringify({
        type: "ticker",
        code,
        trade_price,
        timestamp,
        signed_change_rate: 0,
        acc_trade_price_24h: 0,
        signed_change_price: 0,
        acc_trade_volume_24h: 0,
        high_price: 0,
        low_price: 0,
        prev_closing_price: 0
      })
    } as MessageEvent);
  }

  receiveStatus(type: "upstream_connected" | "upstream_disconnected") {
  this.onmessage?.({
    data: JSON.stringify({ type })
  } as MessageEvent)
}
}

function TestComponent() {
  useWebSocket();
  const prices = useRecoilValue(CoinPrice);
  return <pre data-testid="prices">{JSON.stringify(prices)}</pre>;
}

const getPrices = () => JSON.parse(screen.getByTestId("prices").textContent || "{}");

const createPrice = (trade_price: number, timestamp: number): PriceData => ({
  trade_price,
  timestamp,
  change_rate: 0,
  acc_price: 0,
  change_price: 0,
  trade_volume: 0,
  high_price: 0,
  low_price: 0,
  prev_closing_price: 0
});

describe("실제 useWebSocket 훅 테스트", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    MockWebSocket.instances = [];
    vi.stubGlobal("WebSocket", MockWebSocket);
    vi.mocked(axiosInstance.get).mockResolvedValue({
      data: {}
    } as AxiosResponse);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("여러 코인의 최신 가격을 한 번에 Recoil에 반영한다", async () => {
    render(
      <RecoilRoot>
        <TestComponent />
      </RecoilRoot>
    );

    await act(async () => {
      await Promise.resolve();
    });

    const ws = MockWebSocket.instances[0];
    expect(ws).toBeDefined();

    act(() => {
      ws.receive("KRW-BTC", 1000, 100)
      ws.receive("KRW-ETH", 2000, 100)
      ws.receive("KRW-XRP", 3000, 100)
      ws.receive("KRW-BTC", 1200, 200)
    });

    expect(getPrices()["KRW-BTC"]).toBeUndefined();

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    const prices = getPrices();
    expect(prices["KRW-BTC"].trade_price).toBe(1200);
    expect(prices["KRW-ETH"].trade_price).toBe(2000);
    expect(prices["KRW-XRP"].trade_price).toBe(3000);
  });

  it("언마운트 시 WebSocket을 종료한다", async () => {
    const { unmount } = render(
      <RecoilRoot>
        <TestComponent />
      </RecoilRoot>
    );

    await act(async () => {
      await Promise.resolve();
    });

    const ws = MockWebSocket.instances[0];

    unmount();

    expect(ws.close).toHaveBeenCalledTimes(1);
  });

  it("REST 데이터가 더 최신이면 REST 가격을 반영한다", async () => {
    let resolveRest!: (response: AxiosResponse) => void

    vi.mocked(axiosInstance.get).mockImplementationOnce(
      () => new Promise<AxiosResponse>(resolve => {
        resolveRest = resolve
      })
    )

    render(
      <RecoilRoot>
        <TestComponent />
      </RecoilRoot>
    )

    const ws = MockWebSocket.instances[0]

    act(() => {
      ws.receive("KRW-BTC", 1200, 200)
    })

    await act(async () => {
      vi.advanceTimersByTime(300)
    })

    expect(getPrices()["KRW-BTC"].trade_price).toBe(1200)

    await act(async () => {
      resolveRest({
        data: {
          "KRW-BTC": createPrice(1300, 300)
        }
      } as AxiosResponse)
    })

    expect(getPrices()["KRW-BTC"].trade_price).toBe(1300)
    expect(getPrices()["KRW-BTC"].timestamp).toBe(300)
  })

  it("WebSocket 데이터가 더 최신이면 WebSocket 가격을 유지한다", async () => {
    let resolveRest!: (response: AxiosResponse) => void

    vi.mocked(axiosInstance.get).mockImplementationOnce(
      () => new Promise<AxiosResponse>(resolve => {
        resolveRest = resolve
      })
    )

    render(
      <RecoilRoot>
        <TestComponent />
      </RecoilRoot>
    )

    const ws = MockWebSocket.instances[0]

    act(() => {
      ws.receive("KRW-BTC", 1200, 300)
    })

    await act(async () => {
      vi.advanceTimersByTime(300)
    })

    expect(getPrices()["KRW-BTC"].trade_price).toBe(1200)

    await act(async () => {
      resolveRest({
        data: {
          "KRW-BTC": createPrice(1100, 200)
        }
      } as AxiosResponse)
    })

    expect(getPrices()["KRW-BTC"].trade_price).toBe(1200)
    expect(getPrices()["KRW-BTC"].timestamp).toBe(300)
  })

  it("WebSocket 재연결 성공 시 REST API를 다시 호출한다", async () => {
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: {}
    } as AxiosResponse)

    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: {
        "KRW-BTC": createPrice(1300, 300)
      }
    } as AxiosResponse)
    render(
      <RecoilRoot>
        <TestComponent />
      </RecoilRoot>
    )

    await act(async () => {
      await Promise.resolve()
    })

    // 최초 rest 요청
    expect(axiosInstance.get).toHaveBeenCalledTimes(1)

    const firstWs = MockWebSocket.instances[0]

    // 최초 웹소켓 연결 성공
    act(() => {
      firstWs.open()
    })

    // 연결 종료
    act(() => {
      firstWs.disconnect()
    })

    // 1초 후 재연결 시도
    await act(async () => {
      vi.advanceTimersByTime(1000)
    })

    expect(MockWebSocket.instances).toHaveLength(2)

    const secondWs = MockWebSocket.instances[1]

    // 재연결 성공
    await act(async () => {
      secondWs.open()
    })

    // 재연결 성공 시 rest 요청이 한 번 더 발생해야 함
    expect(axiosInstance.get).toHaveBeenCalledTimes(2)
    expect(getPrices()["KRW-BTC"].trade_price).toBe(1300)
    expect(getPrices()["KRW-BTC"].timestamp).toBe(300)

  })

  it("오래된 REST 요청 A가 나중에 도착해도 Recoil을 변경하지 않는다", async () => {
    let resolveA!: (response: AxiosResponse) => void
    let resolveB!: (response: AxiosResponse) => void

    vi.mocked(axiosInstance.get)
      .mockImplementationOnce(
        () => new Promise<AxiosResponse>(resolve => {
          resolveA = resolve
        })
      )
      .mockImplementationOnce(
        () => new Promise<AxiosResponse>(resolve => {
          resolveB = resolve
        })
      )

    render(
      <RecoilRoot>
        <TestComponent />
      </RecoilRoot>
    )

    // 최초 REST 요청 A 시작
    expect(axiosInstance.get).toHaveBeenCalledTimes(1)

    const firstWs = MockWebSocket.instances[0]

    act(() => {
      firstWs.open()
      firstWs.disconnect()
    })

    // 1초 뒤 WebSocket 재연결
    await act(async () => {
      vi.advanceTimersByTime(1000)
    })

    const secondWs = MockWebSocket.instances[1]

    // 재연결 성공 → REST 요청 B 시작
    act(() => {
      secondWs.open()
    })

    expect(axiosInstance.get).toHaveBeenCalledTimes(2)

    // REST 요청 B가 먼저 완료됨
    await act(async () => {
      resolveB({
        data: {
          "KRW-BTC": createPrice(1300, 300)
        }
      } as AxiosResponse)
    })

    expect(getPrices()["KRW-BTC"].trade_price).toBe(1300)

    // 오래된 요청 A가 나중에 완료됨
    // timestamp가 더 커도 무효화된 요청이므로 반영되면 안 됨
    await act(async () => {
      resolveA({
        data: {
          "KRW-BTC": createPrice(1500, 500)
        }
      } as AxiosResponse)
    })

    expect(getPrices()["KRW-BTC"].trade_price).toBe(1300)
    expect(getPrices()["KRW-BTC"].timestamp).toBe(300)
  })

  it("Upbit 연결이 끊어진 상태로 접속해도 복구 시 REST를 다시 조회한다", async () => {
    render(
      <RecoilRoot>
        <TestComponent />
      </RecoilRoot>
    )

    const ws = MockWebSocket.instances[0]

    // 최초 REST 요청
    expect(axiosInstance.get).toHaveBeenCalledTimes(1)

    // Node.js 연결 성공
    act(() => {
      ws.open()
    })

    // 접속 당시 Upbit는 이미 연결 종료 상태
    act(() => {
      ws.receiveStatus("upstream_disconnected")
    })

    expect(axiosInstance.get).toHaveBeenCalledTimes(1)

    // 이후 Upbit 연결 복구
    await act(async () => {
      ws.receiveStatus("upstream_connected")
    })

    // 복구했으므로 REST 재조회
    expect(axiosInstance.get).toHaveBeenCalledTimes(2)

    // 동일한 연결 상태 메시지를 다시 받아도 중복 조회하지 않음
    await act(async () => {
      ws.receiveStatus("upstream_connected")
    })

    expect(axiosInstance.get).toHaveBeenCalledTimes(2)
  })
});
