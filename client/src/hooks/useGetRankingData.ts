import { useQuery } from "@tanstack/react-query"
import axiosInstance from "./useGetRefresh"


const getRanking = async () => {
    console.log('fadsfasdhflkahsdgoadsklghdsa;h')
    const res = await axiosInstance.get('/api/rank/top')
    console.log('resdfasfasdfasd.', res.data)
    return res.data
}

export function useGetRankingData() {
    return useQuery({
        queryKey: ['ranking'],
        queryFn: getRanking
    })
}