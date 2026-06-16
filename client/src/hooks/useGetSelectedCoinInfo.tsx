import { useMemo } from "react"
import useGetCoins from "./useGetCoins"

export const useSelectedCoinInfo = (coinEName: string) => {
    const { data: allCoins, ...rest} = useGetCoins()

    const coinData = useMemo(() => {
        return allCoins?.find((c) => c.market === coinEName)
    },[allCoins, coinEName])

    return { coinData, ...rest}
}