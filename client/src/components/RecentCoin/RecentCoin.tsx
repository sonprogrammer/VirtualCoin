
import { CoinModal } from "../CoinModal";
import useGetRecentCoin from "../../hooks/useGetRecentCoin";
import { useRecoilState } from "recoil";
import { CoinPrice } from "../../context/CoinPrice";
import useGetCoins from "../../hooks/useGetCoins";




interface RecentCoinProps{
    handleOutsideClick: () => void;
}
const RecentCoin = ({handleOutsideClick} : RecentCoinProps) => {

    const { data: recentCoin } = useGetRecentCoin();
    const [prices] = useRecoilState(CoinPrice);
    const { data: coinName } = useGetCoins();


    const sortedCoins = recentCoin?.map((market: string) => {
        return coinName?.find((c: any)=> c.market === market)
    })

    const coinData = sortedCoins?.map((name: any)=> ({
        coinKoreanName: name.korean_name,
        coinMarket: name.market,
        price: prices[name.market]
    }) )

   
    
    
      return <CoinModal title="최근 본 코인(10개)" coinData={coinData} onClickOutside={handleOutsideClick} />;
}

export default RecentCoin
