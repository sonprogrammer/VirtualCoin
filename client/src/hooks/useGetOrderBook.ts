import { useEffect, useState } from "react";

interface OrderBook {
  bids: Array<{changeRate: number; price: string; quantity: string }>;
  asks: Array<{changeRate: number; price: string; quantity: string }>;
}

const useGetOrderBook = (market: string) => {
  const [orderBook, setOrderBook] = useState<OrderBook | null>(null);
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
            
          }


          if (data.type === "orderbook") {

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

  return { orderBook, prevClosingPrice };
};

export default useGetOrderBook;

