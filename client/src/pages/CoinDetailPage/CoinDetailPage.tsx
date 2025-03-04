import { useParams } from "react-router-dom"
import { CoinChartGraphComponent, CoinVoiceComponent, DetailCoinInfoComponent, TradeComponent } from "../../components"

import useGetOrderBook from "../../hooks/useGetOrderBook";
import useWebSocket from "../../hooks/useWebSocket";
import { useRecoilValue } from "recoil";
import { CoinPrice } from "../../context/CoinPrice";



const CoinDetailPage = () => {
  const { coinId } = useParams()
  const { orderBook } = useGetOrderBook(coinId || "");

  const ObjCoin = [{ market: coinId }];
  const prices = useWebSocket(ObjCoin);
  const coinInfo = prices[coinId || '']

  // const prices = useRecoilValue(CoinPrice)
  


  return (
    <div className="디테일 flex flex-col w-full h-full gap-3 p-5 overflow-y-auto">

      <div className="맨위에 있어야함">
        <DetailCoinInfoComponent coinId={coinId}  coinInfo={coinInfo}/>
      </div>

      {/* //*TODO 백엔드 서버에서 프록시 서버짜고 다시 만들기 (cors에러 뜸) */}
      {/* <CoinChartGraphComponent /> */}


      <div className="차트 w-full">
        차트
      </div>

      <div className="호가,거래창 flex justify-between  max-h-[700px]">
        <div className="호가창 w-[50%]">
          <CoinVoiceComponent orderBook={orderBook}/>
        </div>

        <div className="거래창 w-[45%]">
          <TradeComponent />
        </div>
      </div>


    </div>
  )
}

export default CoinDetailPage
