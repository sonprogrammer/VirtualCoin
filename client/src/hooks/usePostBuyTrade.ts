

import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "./useGetRefresh"




const postHolding = async({market, name, amount, avgBuyPrice, userId}: {market: string, name: string, amount: number, avgBuyPrice: number, userId: string}) => {
    // console.log('market', market, name, amount, avgBuyPrice, userId)
    const res = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/holding/${market}/buy-reserve`,{
        amount, //거래량
        avgBuyPrice, //지정가
        name, //코인 한국이름
        userId //유저 오브젝트 아이디
    })
    return res.data
}
const usePostBuyTrade = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: postHolding,
        onSuccess: async (_, variable) => {

            const { userId} = variable

            await queryClient.invalidateQueries({ queryKey : ['holdingOrders']})
            await queryClient.invalidateQueries({queryKey :['asset', userId]})
        },
        onError: (error) => {
            console.error('usePostBuyTrade훅 실패', error)
        }
    })

}

export default usePostBuyTrade