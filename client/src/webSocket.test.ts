
import { afterEach, describe, expect, it, vi } from "vitest";
import { throttle } from "lodash";

interface TestMessage {
  code: string;
  trade_price: number;
}

const messages: TestMessage[] = [
  { code: "BTC", trade_price: 1000 },
  { code: "ETH", trade_price: 2000 },
  { code: "XRP", trade_price: 3000 },
  { code: "BTC", trade_price: 1200 }
];

describe("WebSocket 시세 업데이트 비교", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("기존 throttle은 중간 코인 업데이트가 누락", () => {
    vi.useFakeTimers();
    const prices: Record<string, number> = {};

    const throttledSetPrices = throttle((data: TestMessage) => {
      prices[data.code] = data.trade_price;
    }, 300);

    messages.forEach(data => throttledSetPrices(data));
    vi.advanceTimersByTime(300);

    console.log("기존 방식", prices);

    expect(prices).toEqual({
      BTC: 1200
    });

    throttledSetPrices.cancel();
  });

  it("Map버전 throttle은 모든 코인의 최신 가격을 반영", () => {
    vi.useFakeTimers();
    const prices: Record<string, number> = {};
    const pendingPrices = new Map<string, number>();

    const throttledSetPrices = throttle(() => {
      const updates = Object.fromEntries(pendingPrices);
      pendingPrices.clear();
      Object.assign(prices, updates);
    }, 300, { leading: false, trailing: true });

    messages.forEach(data => {
      pendingPrices.set(data.code, data.trade_price);
      throttledSetPrices();
    });

    vi.advanceTimersByTime(300);

    console.log("개선 방식", prices);

    expect(prices).toEqual({
      BTC: 1200,
      ETH: 2000,
      XRP: 3000
    });

    throttledSetPrices.cancel();
  });
});
