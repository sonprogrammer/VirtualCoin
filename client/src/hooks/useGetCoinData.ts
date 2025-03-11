
import { useEffect, useState } from "react";
import useGetCoins from "./useGetCoins";
import useWebSocket from "./useWebSocket";


export interface PriceData {
    trade_price: number;
    change_rate: number;
    acc_price: number;
    change_price: number;
    trade_volume: number;
    high_price: number;
    low_price: number;
  }


  export interface CoinData {
    coinKoreanName: string; // 코인 한국 이름
    coinMarket: string; // 마켓 이름 
    price: PriceData | null; 
  }
  
  const useGetCoinData = () => {
      
      const { data: coinNameList} = useGetCoins()

      console.log('coahslzfhdslakfh;lds', coinNameList)
    const coinPrices = useWebSocket(coinNameList?.map((c: any) => c.market) || [])
    console.log('coinprice', coinPrices)

    const [mergedData, setMergedData] = useState<{ [key: string]: CoinData }>({});

    useEffect(() => {
        if(coinNameList && coinPrices){
            const merged = coinNameList.reduce((acc: {[key: string]: CoinData}, coin:any) => {
                const coinPrice = coinPrices[coin.market]
                if(coinPrice){
                    acc[coin.market] ={
                        coinKoreanName: coin.korean_name,
                        coinMarket: coin.market,
                        price: coinPrice
                    }
                }
                return acc
            },{})
            setMergedData(merged)
        }
    }, [coinNameList, coinPrices])
    
    console.log('mergeddata', mergedData)
    return mergedData
}

export default useGetCoinData