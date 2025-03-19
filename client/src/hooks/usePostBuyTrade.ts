
import axios from "axios"
import { useMutation } from "@tanstack/react-query"



const postCoinBuy = async({ market, name, amount, avgBuyPrice, userId }: { market: string, name: string, amount: number, avgBuyPrice: number, userId: string }) => {
    const res = await axios.post(`http://localhost:3000/api/asset/${market}/buy`,{
        // market, 
        amount,
        avgBuyPrice,
        name,
        userId
    })
    console.log('postby hook res', res.data)
    return res.data
}
const usePostBuyTrade = () => {
    return useMutation({
        mutationFn: ({ market, name, amount, avgBuyPrice, userId }: { market: string; name: string; amount: number; avgBuyPrice: number, userId: string })=> {
                return postCoinBuy({market, name, amount, avgBuyPrice, userId})
            
        },
        onSuccess: (data) => {
            console.log('usePostBuyTrade훅 성공')
        },
        onError: (error) => {
            console.error('usePostBuyTrade훅 실패')
        }
    })

}

export default usePostBuyTrade