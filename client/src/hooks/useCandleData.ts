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
    staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false, 
  }
  );
};

export default useCandleData;
