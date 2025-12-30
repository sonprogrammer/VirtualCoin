import { useParams } from "react-router-dom"
import { CoinChartGraphComponent, CoinVoiceComponent, DetailCoinInfoComponent, TradeComponent } from "../../components"

import useGetOrderBook from "../../hooks/useGetOrderBook";
import { useEffect, useState } from "react";
import { LeftSection, MainContent, RightSection, StyledChart, StyledContainer, StyledOrderBook, StyledOrderBookAndTrade, StyledOrderBookWrapper, StyledTrade, StyledTradeWrapper } from "./style";
import { useRecoilState } from "recoil";
import { CoinPrice } from "../../context/CoinPrice";


interface PriceData {
  trade_price: number;
  change_rate: number;
  acc_price: number;
  change_price: number;
  trade_volume: number;
  high_price: number;
  low_price: number;
}



const CoinDetailPage = () => {
  const { coinId } = useParams()

  const [coinInfo, setCoinInfo] = useState<PriceData | null>(null);

  const { orderBook } = useGetOrderBook(coinId || "");

  const [coinPrice] = useRecoilState(CoinPrice)

  useEffect(() => {
    if (coinPrice && coinId) {
      setCoinInfo(coinPrice[coinId]);
    }
  }, [coinPrice]);


  
// ! 790, 630, 450 반응형

  return (
    <StyledContainer>

      <DetailCoinInfoComponent coinId={coinId || ''} coinInfo={coinInfo}/>


      <StyledChart>
        <CoinChartGraphComponent />
      </StyledChart>


      <StyledOrderBookAndTrade>
        <StyledOrderBook>
          <CoinVoiceComponent orderBook={orderBook}/>
        </StyledOrderBook>

        <StyledTrade>
          <TradeComponent />
        </StyledTrade>
      </StyledOrderBookAndTrade>
    </StyledContainer>
  )
}

export default CoinDetailPage
