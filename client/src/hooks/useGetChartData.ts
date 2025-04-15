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
    ChartCandleData[], // 페이지 데이터를 InfiniteData<ChartCandleData[]>로 명시
    Error, 
    ChartCandleData[], // 결과는 ChartCandleData[] 타입
    [string, string, CandleType, number?], // queryKey 타입
    string | undefined  // pageParam 타입
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
            const oldest = lastPage[0]; // 제일 오래된 데이터
            return dayjs.unix(oldest.time).subtract(1, 'second').toISOString();
          },
          staleTime: 1000 * 60,         
    })
}


export default useGetChartData;
