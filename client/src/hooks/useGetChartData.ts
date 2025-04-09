// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios'

// const getChartData = async({market, unit} : {market: string, unit: number}) => {
//     const res = await axios.get(`https://api.upbit.com/v1/candles/minutes/${unit}?market=${market}&count=200`)

//     return res.data.reverse().map((item: any) => ({
//         time: Math.floor(new Date(item.candle_date_time_kst).getTime() / 1000),
//         open: item.opening_price,
//         high: item.high_price,
//         low: item.low_price,
//         close: item.trade_price
//     }))
    
// }

// const useGetChartData = (market: string, unit:number) => {
//     return useQuery({
//         queryKey: ['candle', market, unit],
//         queryFn: () => getChartData({market, unit}),
//         refetchInterval: 60 * 1000
//     })
// }

// export default useGetChartData



import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import getChartData, { CandleType } from "../utils/getChartData";

const useGetChartData = (market: string, type: CandleType, unit?: number) => {
    return useInfiniteQuery({
        queryKey: ['chartData', market, type, unit],
        queryFn: async ({pageParam}) => {
            console.log("👉 pageParams:", pageParam)
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
