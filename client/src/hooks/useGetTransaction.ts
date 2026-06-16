import { useQuery } from "@tanstack/react-query"
import axiosInstance from "./useGetRefresh"

interface TransactionCoinData {
    amount : number;
    completedTime: string;
    kName: string
    market: string;
    orderTime: string;
    price: number;
    type: string;
}
interface TransactionData{
    userId: string;
    coins: TransactionCoinData[],
    _id: string;
}

interface TransactionResponse {
    message: string;
    transaction: TransactionData | null
}


const getTransaction = async(userId: string): Promise<TransactionData | null> => {
    const res = await axiosInstance.get<TransactionResponse>(`${import.meta.env.VITE_API_URL}/api/transaction/${userId}`)
    return res.data.transaction
}

const useGetTransaction = (userId: string) => {
    return useQuery({
        queryKey: ['transactions', userId],
        queryFn: () => getTransaction(userId)
    })
}

export default useGetTransaction