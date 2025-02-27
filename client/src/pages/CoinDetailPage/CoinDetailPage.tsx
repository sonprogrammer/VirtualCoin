import { useParams } from "react-router-dom"
import { CoinChartGraphComponent, CoinVoiceComponent, TradeComponent } from "../../components"


const CoinDetailPage = () => {

  return (
    <div className="디테일">
      {/* <div>
        <p>코인이름</p>
      </div>
      <div className="flex coingraph">
      <div>
      </div> */}
        <CoinChartGraphComponent />
      {/* <div className="호가창">
        <CoinVoiceComponent />
      </div>

      <div className="거래창 flex flex-col">
      <TradeComponent />
      </div> */}

      {/* </div> */}
    </div>
  )
}

export default CoinDetailPage
