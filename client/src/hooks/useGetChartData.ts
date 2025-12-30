import {  useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import getChartData, { CandleType } from "../utils/getChartData";

type ChartCandleData = {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  };

const useGetChartData = (market: string, type: CandleType, unit?: number) => {
    return useInfiniteQuery
    <
    ChartCandleData[], 
    Error, 
    ChartCandleData[], 
    [string, string, CandleType, number?], 
    string | undefined 
  >
        ({
        queryKey: ['chartData', market, type, unit],
        queryFn: async ({pageParam}) => {
            return await getChartData({
                market, type, unit, to: pageParam, count:200
            })
            
        },
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
            if (!lastPage || lastPage.length === 0) return undefined;
            const oldest = lastPage[0]; 
            return dayjs.unix(oldest.time).subtract(1, 'second').toISOString();
          },
          staleTime: 1000 * 60,         
    })
}


export default useGetChartData;
