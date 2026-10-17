import { useEffect, useMemo, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { CoinPrice } from "../context/CoinPrice";

import { throttle } from "lodash";
import { getLatestPrice } from "../utils/getLatestPrice";
import axiosInstance from "./auth/useGetRefresh";

export interface PriceData {
  trade_price: number;
  change_rate: number;
  acc_price: number;
  change_price: number;
  trade_volume: number;
  high_price: number;
  low_price: number;
  prev_closing_price: number;
  timestamp: number
}

interface TickerData {
  type: "ticker";
  code: string;
  trade_price: number;
  signed_change_rate: number;
  acc_trade_price_24h: number;
  signed_change_price: number;
  acc_trade_volume_24h: number;
  high_price: number;
  low_price: number;
  prev_closing_price: number;
  timestamp: number
}


const useWebSocket = () => {
  const setPrices = useSetRecoilState(CoinPrice)
  const pendingPrices = useRef(new Map<string, PriceData>())

  const throttledSetPrices = useMemo(() =>
    throttle(() => {
      if (pendingPrices.current.size === 0) return;

      const updates = new Map(pendingPrices.current)
      pendingPrices.current.clear();

      setPrices(prev => {
        const next = { ...prev }

        for (const [code, price] of updates) {
          next[code] = getLatestPrice(next[code], price)
        }

        return next
      })
    }, 300, { leading: false, trailing: true }), [setPrices])

  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let reconnectAttempts = 0;
    let isUnmounted = false;
    let hasConnected = false
    let syncRequestId = 0
    let syncUpdates: Map<string, PriceData> | null = null
    let upstreamStatus: "connected" | "disconnected" | null = null


    const fetchRestPrice = async () => {
      const requestId = ++syncRequestId
      const currentSyncUpdates = new Map<string, PriceData>()
      syncUpdates = currentSyncUpdates

      try {
        const res = await axiosInstance.get<Record<string, PriceData>>('/coins/tickers')

        if (isUnmounted || requestId !== syncRequestId) return
        setPrices(prev => {
          const next = { ...prev }

          // Rest 기존 전역상태 데이터 비교
          for (const [code, price] of Object.entries(res.data)) {
            next[code] = getLatestPrice(next[code], price)
          }

          // Rest 요청 중 수신한 웹소켓 데이터와 비교
          for (const [code, price] of currentSyncUpdates) {
            next[code] = getLatestPrice(next[code], price)
          }

          return next
        })
      } catch (error) {
        if (!isUnmounted && requestId === syncRequestId) {
          console.error("reest 오류", error)
        }
      } finally {
        if (requestId === syncRequestId) {
          syncUpdates = null;
        }
      }
    }

    void fetchRestPrice()

    const connect = () => {
      if (isUnmounted) return

      ws = new WebSocket(import.meta.env.VITE_WS_URL)

      ws.onopen = () => {
        if (isUnmounted) return
        reconnectAttempts = 0
        console.log("WebSocket 연결 성공")

        if (hasConnected) {
          void fetchRestPrice();
        }

        hasConnected = true
      };

      ws.onmessage = (e) => {
        if (isUnmounted) return
        try {
          const data: TickerData | { type: 'upstream_connected' | 'upstream_disconnected' } = JSON.parse(e.data)

          if (data.type === 'upstream_disconnected') {
            upstreamStatus = 'disconnected'
            syncRequestId++
            syncUpdates = null
            return
          }

          if (data.type === 'upstream_connected') {
            
            if (upstreamStatus === 'disconnected') {
              void fetchRestPrice()
            }

            upstreamStatus = 'connected'
            return
          }


          if (data.type !== "ticker") return;

          const price: PriceData = {
            trade_price: data.trade_price,
            change_rate: data.signed_change_rate,
            acc_price: data.acc_trade_price_24h,
            change_price: data.signed_change_price,
            trade_volume: data.acc_trade_volume_24h,
            high_price: data.high_price,
            low_price: data.low_price,
            prev_closing_price: data.prev_closing_price,
            timestamp: data.timestamp
          }

          const pending = pendingPrices.current.get(data.code)

          pendingPrices.current.set(data.code, getLatestPrice(pending, price))

          if (syncUpdates) {
            const current = syncUpdates.get(data.code)
            syncUpdates?.set(data.code, getLatestPrice(current, price))
          }

          throttledSetPrices()
        } catch (error) {
          console.error("Error WebSocket", error)
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket 오류", error)
      }

      ws.onclose = () => {
        if (isUnmounted) return;

        upstreamStatus = null
        syncRequestId++;
        syncUpdates = null;
        const delay = Math.min(1000 * 2 ** reconnectAttempts, 30000);
        reconnectAttempts++;

        reconnectTimer = setTimeout(() => {
          reconnectTimer = null;
          connect();
        }, delay)
      }
    }

    connect()

    return () => {
      isUnmounted = true;
      syncRequestId++;
      syncUpdates = null;
      if (reconnectTimer) clearTimeout(reconnectTimer)
      ws?.close()
      throttledSetPrices.cancel()
      pendingPrices.current.clear()
    };
  }, [setPrices, throttledSetPrices]);

  return null;
};

export default useWebSocket;
