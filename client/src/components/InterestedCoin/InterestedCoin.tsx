
import { CoinModal } from "../CoinModal";
import useGetCoins from "../../hooks/useGetCoins";
import useGetLikedCoins from "../../hooks/useGetLikeCoins";
import { useMemo } from "react";



interface InterestedCoinProps{
    onClose: () => void;
}


const InterestedCoin = ({onClose} : InterestedCoinProps) => {
    const { likedCoins } = useGetLikedCoins()
    const { data: coinName } = useGetCoins();    

    console.log('interested')
    
    const coinData = useMemo(() => {
        const coinSet = new Set(likedCoins);
        return coinName?.filter((c) => coinSet.has(c.market))
             .map((name) => ({
                 coinKoreanName: name.korean_name,
                 coinMarket: name.market
             })) ?? [];
    }, [likedCoins, coinName])

    
      return(
         <CoinModal title="관심코인" coinData={coinData} onClose={onClose} />
    )
}

export default InterestedCoin
