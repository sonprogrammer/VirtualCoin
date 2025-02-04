import { CoinChartComponent, CoinListComponent, OrderCoinComponent, TradeComponent } from "../../components"

const MarketPage = () => {

    return (
      <div>
            <div className="left">
                <CoinChartComponent /> 
                {/* 차트 */}
                <TradeComponent /> 
                {/* 사용자가 매수/매도 주문 입력하는 폼 */}
            </div>
            <div className="right">
                <CoinListComponent /> 
                {/* 거래 가능한 코인 목록 */}
                <OrderCoinComponent /> 
                {/* 호가창 (매수/매도 주문 목록) */}
            </div>
      </div>
    )
}

export default MarketPage
