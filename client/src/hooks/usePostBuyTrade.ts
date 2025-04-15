
import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"




const postHolding = async({market, name, amount, avgBuyPrice, userId}: {market: string, name: string, amount: number, avgBuyPrice: number, userId: string}) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/holding/${market}/buy-reserve`,{
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
        mutationFn: ({ market, name, amount, avgBuyPrice, userId }: { market: string; name: string; amount: number; avgBuyPrice: number, userId: string, cash: number })=> {
                return postHolding({market, name, amount, avgBuyPrice, userId})
            
        },
        onSuccess: async (variable) => {

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