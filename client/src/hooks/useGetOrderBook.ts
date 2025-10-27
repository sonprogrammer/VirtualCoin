import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CoinPrice } from "../context/CoinPrice";

export interface OrderBook {
  bids: Array<{changeRate: number; price: string; quantity: string }>;
  asks: Array<{changeRate: number; price: string; quantity: string }>;
}


const useGetOrderBook = (market: string) => {
  const [orderBook, setOrderBook] = useState<OrderBook | null>(null);
  const [coinPrice] = useRecoilState(CoinPrice)

  const [prevClosingPrice, setPriceClosingPrice] = useState<number | null>(null)
  

  useEffect(() => {
    const closing = coinPrice[market]?.prev_closing_price
    if(closing){
      setPriceClosingPrice(closing)
    }
  },[coinPrice, market])
  
  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WS_URL)
    if (!prevClosingPrice) return
    ws.onopen = () => {
      console.log(`websocket connected from orderbook ${market}`)
    }

    ws.onmessage = (e) => {

        try {
          const data = JSON.parse(e.data)


          if (data.type === "orderbook" && prevClosingPrice !== null && data.code === market) {

              //!매수
              const bids = data.orderbook_units.map((unit: any) => ({
                price: unit.bid_price,
                quantity: unit.bid_size,
                changeRate: ((unit.bid_price - prevClosingPrice) / prevClosingPrice) * 100
              }))
              
              //!매도
              const asks = data.orderbook_units.map((unit: any) => ({
                price: unit.ask_price,
                quantity: unit.ask_size,
                changeRate: ((unit.ask_price - prevClosingPrice) / prevClosingPrice) * 100
              }))
              
              
              setOrderBook({bids, asks})
            }
          } catch (error) {
             console.log('orderbook websocket error',error)
         }
          
        }
  
      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
      };
      ws.onclose = () => {
        console.log(`websocket connection is closed from ${market} `)
      }

    return () => {
      ws.close();
    };
  }, [market,prevClosingPrice])

  return { orderBook, prevClosingPrice };
};

export default useGetOrderBook;

