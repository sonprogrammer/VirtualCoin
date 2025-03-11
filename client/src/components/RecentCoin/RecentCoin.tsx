import { useState } from "react";
import { CoinModal } from "../CoinModal";
import useGetRecentCoin from "../../hooks/useGetRecentCoin";
import { useRecoilState, useRecoilValue } from "recoil";
import { CoinPrice } from "../../context/CoinPrice";
import useGetCoins from "../../hooks/useGetCoins";
import useGetCoinData from "../../hooks/useGetCoinData";



interface RecentCoinProps{
    handleOutsideClick: () => void;
}
const RecentCoin = ({handleOutsideClick} : RecentCoinProps) => {

    // TODO여기 밑에 false자리에는 카카오유저인지 확인하는거임 카카오유저 로그인이면 true임 아니면 false
    const { data: recentCoin } = useGetRecentCoin(false);
    const [prices] = useRecoilState(CoinPrice);
    const { data: coinName } = useGetCoins();

    const recentCoinSet = new Set(recentCoin)
    const coinN = coinName?.filter((c: any) => recentCoinSet.has(c.market))
    console.log('coinN', recentCoin)

    const coinData = coinN?.map((name: any)=> ({
        coinKoreanName: name.korean_name,
        coinMarket: name.market,
        price: prices[name.market]
    }) )


    const coinMap = coinName?.reduce((acc: { [key: string]: any }, coin: any) => {
            acc[coin.market] = coin.korean_name;
        return acc;
    }, {});
    console.log('coinmap', coinMap)




    console.log('coindata', coinData)
   
    
    
      return <CoinModal title="최근 본 코인" coinData={coinData} onClickOutside={handleOutsideClick} />;
}

export default RecentCoin
