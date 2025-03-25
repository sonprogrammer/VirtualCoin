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
    limitPrice?: number;
  }

const postCoinSell = async({ market, name, amount, avgSellPrice, userId, cash, limitPrice }: SellOrder) => {
    const res = await axios.post(`http://localhost:3000/api/asset/${market}/sell`,{
        name,
        amount,
        avgSellPrice,
        userId,
        cash,
        // limitPrice: type === 'limit' ? limitPrice : undefined
    })
    console.log('usePostSellTrade', res.data)
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
            if(curPrice=== order.avgSellPrice){
                return postCoinSell(order)
            }
        },
        onSuccess: (data) => {
            console.log('usePostBuyTrade훅 성공')
        },
        onError: (error) => {
            console.error('usePostBuyTrade훅 실패')
        }
    })
    return mutation
}

export default usePostSellTrade