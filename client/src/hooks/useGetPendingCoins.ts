import { useQuery } from "@tanstack/react-query"
import axiosInstance from "./useGetRefresh"


const getPendingCoins = async(userId: string) => {
    const res = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/holding/pending/${userId}`)
    return res.data
}


const useGetPendingCoins = (userId: string) => {
    return useQuery({
        queryKey: ['pendingCoins', userId],
        queryFn: () => getPendingCoins(userId)
    })
}

export default useGetPendingCoins