import { useState } from "react"
import { CoinModal } from "../CoinModal";
import useLikeToggle from "../../hooks/useLikeToggle";
import { useRecoilState } from "recoil";
import { CoinPrice } from "../../context/CoinPrice";
import useGetCoins from "../../hooks/useGetCoins";


interface InterestedCoinProps{
    handleOutsideClick: () => void;
}


const InterestedCoin = ({handleOutsideClick} : InterestedCoinProps) => {

    const { guestlikedCoins } = useLikeToggle()
    const { data: coinName } = useGetCoins();    
    const [prices] = useRecoilState(CoinPrice); 

    
    
    const guestlikedCoinsSet = new Set(guestlikedCoins);
    const coinN = coinName?.filter((c:any) => guestlikedCoinsSet.has(c.market));
    

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
