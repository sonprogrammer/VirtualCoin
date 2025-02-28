import { useEffect, useState } from "react";

interface OrderBook {
  bids: Array<{ price: string; quantity: string }>;
  asks: Array<{ price: string; quantity: string }>;
  spreadPercentage: number | null;

}

const useGetOrderBook = (market: string) => {
  const [orderBook, setOrderBook] = useState<OrderBook | null>(null);

  useEffect(() => {
    const orderBookWs = new WebSocket("wss://api.upbit.com/websocket/v1");

    orderBookWs.onopen = () => {
      console.log("Orderbook WebSocket connected");
      orderBookWs.send(
        JSON.stringify([
          { ticket: "coin_list" },
          { type: "orderbook", codes: [market] },

        //  TODO 나중에 현재가도 불러와서 디테일 페이지에서 최고가 최저가 전일대비등 한번에 처리하기 
        ])
      );
    };

    orderBookWs.onmessage = (e) => {
        // console.log("Received data:", e.data); // Blob 객체가 도착
  
        const reader = new FileReader();
  
        // Blob 데이터를 텍스트로 읽어들이고 그 후 처리
        reader.onload = () => {
            // console.log("📤 FileReader loaded:", reader.result); // JSON 파싱 전 데이터 확인

          const data = JSON.parse(reader.result as string); // 텍스트로 읽은 데이터를 JSON 파싱
  
          if (data.type === "orderbook") {

            const bids = data.orderbook_units.map((unit: any) => ({
                price: unit.bid_price,
                quantity: unit.bid_size
            }))

            const asks = data.orderbook_units.map((unit: any) => ({
                price: unit.bid_price,
                quantity: unit.bid_size
            }))

            const bestAsk = asks.length > 0 ? asks[0].price : null
            const bestBid = bids.length > 0 ? bids[0].price : null

            const spreadPercentage = bestAsk && bestBid ? ((bestAsk - bestBid) / bestAsk)*100 : null
            
            
            setOrderBook({
               bids,
               asks,
               spreadPercentage
              });
          } else {
            console.log("Received data is not orderbook type:", data);
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

    // 정리 함수로 WebSocket 연결 종료
    return () => {
      orderBookWs.close();
    };
  }, [market]);

  return { orderBook };
};

export default useGetOrderBook;
