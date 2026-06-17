import { useParams } from "react-router-dom"
import { CoinChartGraphComponent, CoinVoiceComponent, DetailCoinInfoComponent, TradeComponent } from "../../components"
import {  StyledChart, StyledContainer, StyledOrderBook, StyledOrderBookAndTrade, StyledTrade } from "./style";




const CoinDetailPage = () => {
  const { coinEName } = useParams()

  
// ! 790, 630, 450 반응형

  return (
    <StyledContainer>

      <DetailCoinInfoComponent coinEName={coinEName || ''} />


      {/* <StyledChart>
        <CoinChartGraphComponent />
      </StyledChart> */}


      <StyledOrderBookAndTrade>
        {/* <StyledOrderBook>
          <CoinVoiceComponent coinEName={coinEName || ''}/>
        </StyledOrderBook> */}

        <StyledTrade>
          <TradeComponent />
        </StyledTrade>
      </StyledOrderBookAndTrade>
    </StyledContainer>
  )
}

export default CoinDetailPage
