import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios"
import { useRecoilState } from "recoil";
import { CoinPrice } from "../context/CoinPrice";


interface SellOrder {
    market: string;
    name: string;
    amount: number;
    avgSellPrice: number;
    userId: string;
    cash: number;
  }

// const postCoinSell = async({ market, name, amount, avgSellPrice, userId, cash  }: SellOrder) => {
//     const res = await axios.post(`http://localhost:3000/api/asset/${market}/sell`,{
//         name,
//         amount,
//         avgSellPrice,
//         userId,
//         cash,
//         // limitPrice: type === 'limit' ? limitPrice : undefined
//     })
//     console.log('usePostSellTrade', res.data)
//     return res.data
// }

const postHolding = async({market, name, amount, avgSellPrice, userId}: {market: string, name: string, amount: number, avgSellPrice: number, userId: string}) => {
    const res = await axios.post(`http://localhost:3000/api/holding/${market}/sell-reserve`,{
        amount,
        avgSellPrice,
        name,
        userId
    })
    console.log('sellReserve', res.data)
    return res.data
}

const usePostSellTrade = () => {

    const [prices] = useRecoilState(CoinPrice)

    const mutation =  useMutation({
        mutationFn: async(order: SellOrder) => {
            const curPrice = prices[order.market]?.trade_price || 0
            if(!curPrice){ 
                throw new Error('can not find current price')
            }
            if(curPrice >= order.avgSellPrice){
                return postHolding(order)
            }else{
                return postHolding(order)
            }
        },
        onSuccess: (data) => {
            console.log('usePostBuyTrade훅 성공',data)
        },
        onError: (error) => {
            console.error('usePostBuyTrade훅 실패', error)
        }
    })
    return mutation
}

export default usePostSellTrade