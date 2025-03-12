
import { CoinModal } from "../CoinModal";
import useGetRecentCoin from "../../hooks/useGetRecentCoin";
import { useRecoilState } from "recoil";
import { CoinPrice } from "../../context/CoinPrice";
import useGetCoins from "../../hooks/useGetCoins";




interface RecentCoinProps{
    handleOutsideClick: () => void;
}
const RecentCoin = ({handleOutsideClick} : RecentCoinProps) => {

    // TODO여기 밑에 false자리에는 카카오유저인지 확인하는거임 카카오유저 로그인이면 true임 아니면 false
    const { data: recentCoin } = useGetRecentCoin(false);
    const [prices] = useRecoilState(CoinPrice);
    const { data: coinName } = useGetCoins();

    const coinMap = coinName?.reduce((acc: { [key: string]: any }, coin: any) => {
        acc[coin.market] = coin.korean_name;
    return acc;
}, {});

    const coinData = recentCoin?.map((market: string)=> ({
        coinKoreanName: coinMap?.[market] || market,
        coinMarket: market,
        price: prices[market]
    }) )

   
    
    
      return <CoinModal title="최근 본 코인" coinData={coinData} onClickOutside={handleOutsideClick} />;
}

export default RecentCoin
