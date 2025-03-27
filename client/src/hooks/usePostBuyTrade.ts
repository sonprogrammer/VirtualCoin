
import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CoinPrice } from "../context/CoinPrice"
import { useRecoilState } from "recoil"



const postCoinBuy = async({ market, name, amount, avgBuyPrice, userId, cash }: { market: string, name: string, amount: number, avgBuyPrice: number, userId: string, cash: number }) => {
    const res = await axios.post(`http://localhost:3000/api/asset/${market}/buy`,{
        amount,
        avgBuyPrice,
        name,
        userId,
        cash
    })
    console.log('postby hook res', res.data)
    return res.data
}

const postHolding = async({market, name, amount, avgBuyPrice, userId}: {market: string, name: string, amount: number, avgBuyPrice: number, userId: string}) => {
    const res = await axios.post(`http://localhost:3000/api/holding/${market}/buy-reserve`,{
        amount, //거래량
        avgBuyPrice, //지정가
        name, //코인 한국이름
        userId //유저 오브젝트 아이디
    })
    console.log('buyReserve', res.data)
    return res.data
}
const usePostBuyTrade = () => {
    const [prices] = useRecoilState(CoinPrice)
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ market, name, amount, avgBuyPrice, userId, cash }: { market: string; name: string; amount: number; avgBuyPrice: number, userId: string, cash: number })=> {
            const curPrice = prices[market]?.trade_price || 0
            if(!curPrice){ 
                throw new Error('can not find current price')
            }
            if(curPrice <= avgBuyPrice){
                return postCoinBuy({market, name, amount, avgBuyPrice, userId, cash})
            }else{
                return postHolding({market, name, amount, avgBuyPrice, userId})
            }
            
        },
        onSuccess: async (data) => {
            console.log('usePostBuyTrade훅 성공', data)
            await queryClient.invalidateQueries({ queryKey : ['holdingOrders']})
            await queryClient.invalidateQueries({queryKey :['userAssets']})
        },
        onError: (error) => {
            console.error('usePostBuyTrade훅 실패', error)
        }
    })

}

export default usePostBuyTrade