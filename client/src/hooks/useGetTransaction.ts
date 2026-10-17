import { useQuery } from "@tanstack/react-query"
import axiosInstance from "./auth/useGetRefresh";
import { useRecoilValue } from "recoil";
import { userState } from "../context/userState";

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


const getTransaction = async(): Promise<TransactionData | null> => {
    const res = await axiosInstance.get<TransactionResponse>(`/transaction`)
    return res.data.transaction
}

const useGetTransaction = () => {
    const user = useRecoilValue(userState)

    return useQuery({
        queryKey: ['transactions', user?._id],
        queryFn: getTransaction,
        enabled: !!user && !!user._id
    })
}

export default useGetTransaction