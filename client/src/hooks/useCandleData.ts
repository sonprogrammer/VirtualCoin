import { useQuery } from "@tanstack/react-query";
import axios from "axios";



const fetchData = async (market: string, interval: string) => {
 
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/candles/${interval}?market=${market}&count=200`
  );

  return res.data;
};

const useCandleData = (market: string, interval: string) => {
  return useQuery({
    queryKey: ['coinData', market, interval],
    queryFn: () => fetchData(market, interval),
    staleTime: 5 * 60 * 1000, // 데이터가 5분 동안 유효
    // cacheTime: 10 * 60 * 1000, // 캐시된 데이터가 10분 동안 유효
    refetchOnWindowFocus: false, 
  }
  );
};

export default useCandleData;
