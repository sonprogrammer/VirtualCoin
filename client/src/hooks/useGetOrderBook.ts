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
    const orderBookWs = new WebSocket("wss://api.upbit.com/websocket/v1");

    orderBookWs.onopen = () => {
      console.log("Orderbook WebSocket connected");
      orderBookWs.send(
        JSON.stringify([
          { ticket: "coin_list" },
          { type: "orderbook", codes: [market] },
          { type: 'ticker', codes: [market]}

        //  TODO 나중에 현재가도 불러와서 디테일 페이지에서 최고가 최저가 전일대비등 한번에 처리하기 
        ])
      );
    };

    orderBookWs.onmessage = (e) => {
        const reader = new FileReader();

        reader.onload = () => {

          const data = JSON.parse(reader.result as string); 
  
          if(data.type === 'ticker'){
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


          if (data.type === "orderbook") {
            if (!prevClosingPrice) return orderBook; 

            if(prevClosingPrice !== null){

              //!매수
              const bids = data.orderbook_units.map((unit: any) => ({
                price: unit.bid_price,
                quantity: unit.bid_size,
                changeRate: 
                prevClosingPrice !== null ?
                ( ((unit.bid_price - prevClosingPrice) / prevClosingPrice) * 100)
                : null
              }))
              
              //!매도
              const asks = data.orderbook_units.map((unit: any) => ({
                price: unit.ask_price,
                quantity: unit.ask_size,
                changeRate: 
                prevClosingPrice !== null ?
                ((unit.ask_price - prevClosingPrice) / prevClosingPrice) * 100
                : null
              }))
              
              
              setOrderBook({bids, asks})
            }
          } 
          
        };
  
        reader.onerror = (err) => {
          console.error("Error reading Blob data:", err);
        };
  
        reader.readAsText(e.data); 
      };
  
      orderBookWs.onerror = (err) => {
        console.error("WebSocket error:", err);
      };

    return () => {
      orderBookWs.close();
    };
  }, [market, prevClosingPrice]);

  return { orderBook, prevClosingPrice, coinPrice };
};

export default useGetOrderBook;

