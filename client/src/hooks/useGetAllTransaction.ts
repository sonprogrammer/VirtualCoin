import { useQuery } from "@tanstack/react-query"
import axiosInstance from "./useGetRefresh"

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

// API 전체 응답의 타입
export interface AllTransactionResponse {
  message: string;
  allTransaction: {
    createdAt: string;
    updatedAt: string;
    userId: string;
    orders: Order[]; // 위에서 만든 Order 배열
    _id: string;
    __v: number;
  };
}

const getTransaction = async(userId:string): Promise<AllTransactionResponse> => {
    const res = await axiosInstance.get<AllTransactionResponse>(`${import.meta.env.VITE_API_URL}/api/holding/all-transaction/${userId}`)
    return res.data
}


const useGetAllTransaction = (userId: string) => {
    return useQuery({
        queryKey: ['allTransaction', userId],
        queryFn: () => getTransaction(userId),
        enabled: !!userId
    })
}

export default useGetAllTransaction