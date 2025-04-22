import { useEffect, useState } from "react";

export interface OrderBook {
  bids: Array<{changeRate: number; price: string; quantity: string }>;
  asks: Array<{changeRate: number; price: string; quantity: string }>;
}


export interface CoinPriceData {
  trade_price: number; // 현재가
  change_rate: number; // 전일 대비 퍼센트
  acc_price: number; // 거래대금
  change_price: number; // 전일 대비 가격 변동
  trade_volume: number; // 거래량
  high_price: number; // 고가
  low_price: number; // 저가
}

const useGetOrderBook = (market: string) => {
  const [orderBook, setOrderBook] = useState<OrderBook | null>(null);
  const [coinPrice, setCoinPrice] = useState<CoinPriceData | null>(null);

  const [prevClosingPrice, setPriceClosingPrice] = useState<number | null>(null)

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WS_URL)

    ws.onopen = () => {
      ws.send(
        JSON.stringify([
          { type: "orderbook", codes: [market] },
          { type: 'ticker', codes: [market]}

        ])
      )
    }

    ws.onmessage = (e) => {
      //*서버에서 이미 toString으로 보내주고 있음

        try {
          const data = JSON.parse(e.data)

  
          if(data.type === 'ticker' && data.code === market){
            setPriceClosingPrice(data.prev_closing_price)
            setCoinPrice({
              trade_price: data.trade_price, // 현재가
              change_rate: data.signed_change_rate, // 전일 대비 퍼센트
              acc_price: data.acc_trade_price_24h, // 거래대금
              change_price: data.signed_change_price, // 전일 대비 가격 변동
              trade_volume: data.acc_trade_volume_24h, // 거래량
              high_price: data.high_price, // 고가
              low_price: data.low_price // 저가
            });
            
          }

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
        console.log('websocket connection is closed')
      }

    return () => {
      ws.close();
    };
  }, [market,prevClosingPrice])

  return { orderBook, prevClosingPrice, coinPrice };
};

export default useGetOrderBook;

