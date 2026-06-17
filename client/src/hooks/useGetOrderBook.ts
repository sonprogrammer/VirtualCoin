import { useEffect, useRef, useState } from "react";
import {  useRecoilValue } from "recoil";
import { CoinPrice } from "../context/CoinPrice";

export interface OrderBook {
  bids: Array<{ changeRate: number; price: string; quantity: string }>;
  asks: Array<{ changeRate: number; price: string; quantity: string }>;
}

interface OrderBookUnits {
  ask_price: number;
  ask_size: number;
  bid_price: number;
  bid_size: number
}

const useGetOrderBook = (market: string) => {
  const [orderBook, setOrderBook] = useState<OrderBook | null>(null);
  const coinPrice = useRecoilValue(CoinPrice)
  const [prevClosingPrice, setPriceClosingPrice] = useState<number | null>(null)

  const lastUpdate = useRef(0)


  useEffect(() => {
    const closing = coinPrice[market]?.prev_closing_price
    if (closing) {
      setPriceClosingPrice(closing)
    }
  }, [coinPrice, market])

  useEffect(() => {
    if (!prevClosingPrice || !market) return
    const ws = new WebSocket(import.meta.env.VITE_WS_URL)
    ws.onopen = () => {
      // console.log(`websocket connected from orderbook ${market}`)
    }
    ws.onerror = (err) => {
      // console.error("WebSocket error:", err);
    };
    ws.onclose = () => {
      // console.log(`websocket connection is closed from ${market} `)
    }

    ws.onmessage = (e) => {


      const now = Date.now()

      if (now - lastUpdate.current < 200) return

      try {
        const data = JSON.parse(e.data)

        if (data.type === "orderbook" && data.code === market) {
          //!매수
          const bids = data.orderbook_units.map((unit: OrderBookUnits) => ({
            price: unit.bid_price,
            quantity: unit.bid_size,
            changeRate: ((unit.bid_price - prevClosingPrice) / prevClosingPrice) * 100
          }))

          //!매도
          const asks = data.orderbook_units.map((unit: OrderBookUnits) => ({
            price: unit.ask_price,
            quantity: unit.ask_size,
            changeRate: ((unit.ask_price - prevClosingPrice) / prevClosingPrice) * 100
          }))


          setOrderBook({ bids, asks })
          lastUpdate.current = now
        }
      } catch (error) {
        // console.log('orderbook websocket error', error)
      }

    }

    return () => {
      ws.close();
    };
  }, [market, prevClosingPrice])

  return { orderBook };
};

export default useGetOrderBook;

