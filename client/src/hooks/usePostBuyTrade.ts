import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "./auth/useGetRefresh"
import { useRecoilValue } from "recoil"
import { userState } from "../context/userState"





const postHolding = async({market, name, amount, avgBuyPrice}: {market: string, name: string, amount: number, avgBuyPrice: number}) => {
    //* 우선 바로 홀딩으로 갔다가 서버에서 구매가가 현재 가보다 같거나 크면 서버에서 바로 구매 처리됨
    const res = await axiosInstance.post(`/holding/${market}/buy-reserve`,{
        amount, //거래량
        avgBuyPrice, //지정가
        name, //코인 한국이름
    })
    return res.data
}
const usePostBuyTrade = () => {
    const queryClient = useQueryClient()
    const user = useRecoilValue(userState)

    return useMutation({
        mutationFn: postHolding,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey :['asset', user?._id]})
        },
        onError: (error) => {
            console.error('usePostBuyTrade훅 실패', error)
        }
    })

}

export default usePostBuyTrade