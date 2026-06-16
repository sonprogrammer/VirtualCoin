import { useQuery } from "@tanstack/react-query"
import axiosInstance from "./useGetRefresh"


const getRanking = async () => {
    const res = await axiosInstance.get('/api/rank/top')
    return res.data
}

export function useGetRankingData() {
    return useQuery({
        queryKey: ['ranking'],
        queryFn: getRanking
    })
}