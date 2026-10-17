import { useQuery } from "@tanstack/react-query"
import axiosInstance from "./auth/useGetRefresh";
import { useRecoilValue } from "recoil";
import { userState } from "../context/userState";


export interface Order {
  _id: string;
  coinKName: string;
  coinMarket: string;
  orderPrice: number;
  orderQuantity: number;
  orderTime: string;
  completedTime: string;
  status: 'PENDING' | 'COMPLETED';
  type: 'BUY' | 'SELL';
}

export interface AllTransactionResponse {
  message: string;
  allTransaction: {
    createdAt: string;
    updatedAt: string;
    userId: string;
    orders: Order[]; 
    _id: string;
    __v: number;
  };
}

const getTransaction = async(): Promise<AllTransactionResponse> => {
    const res = await axiosInstance.get<AllTransactionResponse>(`/holding/all-transaction`)
    return res.data
}


const useGetAllTransaction = () => {
  const user = useRecoilValue(userState)
    return useQuery({
        queryKey: ['allTransaction', user?._id],
        queryFn: getTransaction,
        enabled: !!user && !!user._id
    })
}

export default useGetAllTransaction