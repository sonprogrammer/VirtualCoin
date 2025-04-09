import { useParams } from "react-router-dom"
import { CoinChartGraphComponent, CoinVoiceComponent, DetailCoinInfoComponent, TradeComponent } from "../../components"

import useGetOrderBook from "../../hooks/useGetOrderBook";
import { useEffect, useState } from "react";
import { StyledChart, StyledContainer, StyledOrderBook, StyledOrderBookAndTrade, StyledTrade } from "./style";


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

  const { orderBook, coinPrice } = useGetOrderBook(coinId || "");



  useEffect(() => {
    if (coinPrice) {
      setCoinInfo(coinPrice);
    }
  }, [coinPrice]);

  
// ! 790, 630, 450 반응형

  return (
    <StyledContainer className="디테일">

      <div className="맨위에 있어야함">
        <DetailCoinInfoComponent coinId={coinId || ''} coinInfo={coinInfo}/>
      </div>



      <StyledChart className="차트 w-full">
      {/* //*TODO 백엔드 서버에서 프록시 서버짜고 다시 만들기 (cors에러 뜸) */}
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
