import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./useGetRefresh";



interface SellOrder {
    market: string;
    name: string; // 한국이름
    amount: number; // 매도 양
    avgSellPrice: number; //매도 코인 금액
    userId: string;
  }


const postHolding = async({market, name, amount, avgSellPrice, userId}: {market: string, name: string, amount: number, avgSellPrice: number, userId: string}) => {
    const res = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/holding/${market}/sell-reserve`,{
        amount,
        avgSellPrice,
        name, // 한국 이름
        userId
    })
    return res.data
}

const usePostSellTrade = () => {

    const mutation =  useMutation({
        mutationFn: async(order: SellOrder) => {
                return postHolding(order)
        },
        onSuccess: (data) => {
            console.log('usePostSellTrade훅 성공',data)
        },
        onError: (error) => {
            console.error('usePostSellTrade훅 실패', error)
        }
    })
    return mutation
}

export default usePostSellTrade