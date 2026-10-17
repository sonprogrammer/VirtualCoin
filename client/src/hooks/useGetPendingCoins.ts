import { useQuery } from "@tanstack/react-query"
import axiosInstance from "./auth/useGetRefresh";
import { useRecoilValue } from "recoil";
import { userState } from "../context/userState";



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

const getPendingCoins = async():Promise<PendingOrder[]> => {
    const res = await axiosInstance.get<PendingOrder[]>(`/holding/pending/`)
    return res.data
}


const useGetPendingCoins = () => {
    const user = useRecoilValue(userState)
    return useQuery({
        queryKey: ['pendingCoins', user?._id],
        queryFn: getPendingCoins,
        enabled: !!user && !!user._id
    })
}

export default useGetPendingCoins