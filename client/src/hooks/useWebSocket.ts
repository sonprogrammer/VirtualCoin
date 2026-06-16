import { useEffect, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import { CoinPrice } from "../context/CoinPrice";
import axiosInstance from "./useGetRefresh";
import { throttle } from "lodash";

export interface PriceData {
  trade_price: number;
  change_rate: number;
  acc_price: number;
  change_price: number;
  trade_volume: number;
  high_price: number;
  low_price: number;
  prev_closing_price: number;
}

const useWebSocket = () => {
  const setPrices = useSetRecoilState(CoinPrice)

  const throttledSetPrices = useMemo(() =>
    throttle((data) => {
      setPrices((prev) => ({
        ...prev,
        [data.code]: {
          trade_price: data.trade_price,
          change_rate: data.signed_change_rate,
          acc_price: data.acc_trade_price_24h,
          change_price: data.signed_change_price,
          trade_volume: data.acc_trade_volume_24h,
          high_price: data.high_price,
          low_price: data.low_price,
          prev_closing_price: data.prev_closing_price,
        }
      }))
    }, 300),[setPrices])

  useEffect(() => {

    const fetchRestPrice = async () => {
      try {
        const res = await axiosInstance.get('/api/coins/tickers')
        setPrices(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchRestPrice()

    const ws = new WebSocket(import.meta.env.VITE_WS_URL)

    ws.onopen = () => {
      // console.log("coinprice WebSocket from server Connected");

    };

    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === "ticker") {
          throttledSetPrices(data)
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    return () => {
      ws.close();
      throttledSetPrices.cancel()
    };
  }, [setPrices, throttledSetPrices]);

  return null;
};

export default useWebSocket;
