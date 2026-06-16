import { selectorFamily } from "recoil";
import { CoinPrice } from "./CoinPrice";
//! 선택된 코인 가격 데이터 가져오는거임


export const selectedCoinPrice = selectorFamily({
    key: 'selectedCoinPrice',
    get: (coinEName: string) => ({get}) => {
        const allPrice = get(CoinPrice)
        return allPrice[coinEName]
    }
})