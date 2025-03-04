import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CoinPrice } from "../context/CoinPrice";

export interface PriceData {
  trade_price: number;
  change_rate: number;
  acc_price: number;
  change_price: number;
  trade_volume: number;
  high_price: number;
  low_price: number;
}

// 거래량(24), 거래대금, 저가, 고가 추가

//*위 데이터 가져옴

const useWebSocket = (coins: any[]) => {
  const [prices, setPrices] = useState<{ [key: string]: PriceData }>({});


  useEffect(() => {
    if(!coins) return

    const ws = new WebSocket("wss://api.upbit.com/websocket/v1");

    ws.onopen = () => {
      console.log("coinprice WebSocket Connected");
      ws.send(
        JSON.stringify([
          { ticket: "coin_list" },
          { type: "ticker", codes: coins.map((c) => c.market) },
        ])
      );
    };

    ws.onmessage = (e) => {
      const reader = new FileReader();
      reader.onload = () => {
        const data = JSON.parse(reader.result as string);
        setPrices((prev) => ({
          ...prev,
          [data.code]: {
            trade_price: data.trade_price, // 현재가
            change_rate: data.signed_change_rate, // 전일 대비 퍼센트
            acc_price: data.acc_trade_price_24h, // 거래대금
            change_price: data.signed_change_price, // 전일 대비 가격 변동
            trade_volume: data.acc_trade_volume_24h, //거래량
            high_price: data.high_price, //고가
            low_price: data.low_price //저가
          },
        }));
      };
      reader.readAsText(e.data);
    };

    
    
    return () => {
      ws.close();
    };
  }, [coins,setPrices]);

  return prices;
};

export default useWebSocket;


