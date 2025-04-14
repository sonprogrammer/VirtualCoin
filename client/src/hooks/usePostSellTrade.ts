import { useMutation } from "@tanstack/react-query";
import axios from "axios"



interface SellOrder {
    market: string;
    name: string;
    amount: number;
    avgSellPrice: number;
    userId: string;
    cash: number;
  }


const postHolding = async({market, name, amount, avgSellPrice, userId}: {market: string, name: string, amount: number, avgSellPrice: number, userId: string}) => {
    const res = await axios.post(`http://localhost:3000/api/holding/${market}/sell-reserve`,{
        amount,
        avgSellPrice,
        name,
        userId
    })
    return res.data
}

const usePostSellTrade = () => {

    // const [prices] = useRecoilState(CoinPrice)

    const mutation =  useMutation({
        mutationFn: async(order: SellOrder) => {
                return postHolding(order)
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