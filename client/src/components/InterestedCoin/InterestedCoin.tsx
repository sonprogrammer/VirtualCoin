
import { CoinModal } from "../CoinModal";
import useLikeToggle from "../../hooks/useLikeToggle";
import { useRecoilState, useRecoilValue } from "recoil";
import { CoinPrice } from "../../context/CoinPrice";
import useGetCoins from "../../hooks/useGetCoins";
import useGetLikedCoins from "../../hooks/useGetLikeCoins";
import { userState } from "../../context/userState";


interface InterestedCoinProps{
    handleOutsideClick: () => void;
}


const InterestedCoin = ({handleOutsideClick} : InterestedCoinProps) => {
  const user = useRecoilValue(userState);


    // const { guestlikedCoins } = useLikeToggle()
    const { likedCoins } = useGetLikedCoins()
    const { data: coinName } = useGetCoins();    
    const [prices] = useRecoilState(CoinPrice); 

    
    
    const coinSet = new Set(likedCoins);
    const coinN = coinName?.filter((c:any) => coinSet.has(c.market));
    

    const coinData = coinN?.map((name: any) => ({
      coinKoreanName : name.korean_name,
      coinMarket: name.market,
      price: prices[name.market]
    }))
    
      return(
         <CoinModal title="관심코인" coinData={coinData} onClickOutside={handleOutsideClick} />
  )
}

export default InterestedCoin
