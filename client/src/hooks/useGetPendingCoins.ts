import { useQuery } from "@tanstack/react-query"
import axiosInstance from "./useGetRefresh"


export interface PendingOrder {
  _id: string;
  coinKName: string;
  coinMarket: string;
  orderPrice: number;
  orderQuantity: number;
  orderTime: string;
  status: string;
  type: 'BUY' | 'SELL';
  completedTime?: string; 
}

const getPendingCoins = async(userId: string):Promise<PendingOrder[]> => {
    const res = await axiosInstance.get<PendingOrder[]>(`${import.meta.env.VITE_API_URL}/api/holding/pending/${userId}`)
    return res.data
}


const useGetPendingCoins = (userId: string) => {
    return useQuery({
        queryKey: ['pendingCoins', userId],
        queryFn: () => getPendingCoins(userId)
    })
}

export default useGetPendingCoins