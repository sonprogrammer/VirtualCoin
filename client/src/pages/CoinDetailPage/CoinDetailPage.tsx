import { useParams } from "react-router-dom"
import { CoinChartGraphComponent, CoinVoiceComponent, DetailCoinInfoComponent, TradeComponent } from "../../components"

import useGetOrderBook from "../../hooks/useGetOrderBook";
import { useEffect, useState } from "react";
import { StyledChart, StyledContainer, StyledOrderBook, StyledOrderBookAndTrade, StyledTrade } from "./style";
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

    // console.log('coin', coinInfo)

  
// ! 790, 630, 450 반응형

  return (
    <StyledContainer className="디테일">

      <div className="맨위에 있어야함">
        <DetailCoinInfoComponent coinId={coinId || ''} coinInfo={coinInfo}/>
      </div>


      <StyledChart className="차트 w-full">
      <CoinChartGraphComponent />
        차트
      </StyledChart>

      <StyledOrderBookAndTrade className="호가랑 거래창">
        <StyledOrderBook className="호가창">
          <CoinVoiceComponent orderBook={orderBook}/>
        </StyledOrderBook>

        <StyledTrade className="거래창">
          <TradeComponent />
        </StyledTrade>
      </StyledOrderBookAndTrade>


    </StyledContainer>
  )
}

export default CoinDetailPage
