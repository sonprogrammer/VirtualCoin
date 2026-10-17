import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRecoilValue } from "recoil";
import { userState } from "../context/userState";
import axiosInstance from "./auth/useGetRefresh";



interface SellOrder {
    market: string;
    name: string; // 한국이름
    amount: number; // 매도 양
    avgSellPrice: number; //매도 코인 금액
  }


const postHolding = async({market, name, amount, avgSellPrice}: SellOrder) => {
    const res = await axiosInstance.post(`holding/${market}/sell-reserve`,{
        amount,
        avgSellPrice,
        name, // 한국 이름
    })
    return res.data
}

const usePostSellTrade = () => {
    const userData = useRecoilValue(userState)
    const queryClient = useQueryClient()

    const mutation =  useMutation({
        mutationFn:  postHolding,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['asset', userData?._id] });
        },
        onError: (error) => {
            console.error('usePostSellTrade훅 실패', error)
        }
    })
    return mutation
}

export default usePostSellTrade