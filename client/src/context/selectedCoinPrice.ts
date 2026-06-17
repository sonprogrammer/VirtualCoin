import { selectorFamily } from "recoil";
import { CoinPrice, PriceData } from "./CoinPrice";
//! 선택된 코인 가격 데이터 가져오는거임


export const selectedCoinPrice = selectorFamily({
    key: 'selectedCoinPrice',
    get: (coinENames: string[]) => ({get}) => {
        const allPrice = get(CoinPrice)
        const res:Record<string, PriceData | undefined> ={}
        coinENames.forEach((name) => {
            res[name] = allPrice[name]
        })
        return res
    }
})