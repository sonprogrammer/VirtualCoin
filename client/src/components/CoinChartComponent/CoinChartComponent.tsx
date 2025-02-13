import { useEffect, useState } from "react"
import axios from 'axios'
import { StyledContainer, StyledPageBtns, StyledTable, StyledTableBody, StyledTableHead, StyledTitle } from "./style"

const CoinChartComponent = () => {
  const [coins, setCoins] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [prices, setPrices] = useState<{ [key: string] : { trade_price: number, change_rate: number, acc_price: number, change_price:number }}>({})
  const [selectedPage, setSelectedPage] = useState(1);  


  const CoinPage = 10;
  //*코인 데이터 가져오기(100개) - rest api로 (고정된 값이니깐 변할일 없어서 )
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://api.upbit.com/v1/market/all')
        console.log('res', res)
        const krwCoins = res.data.filter((coin: any) => coin.market.startsWith("KRW-")).slice(0, 100);
        setCoins(krwCoins);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])

  // *웹소켓 연결 -> 실시간 코인 가격등 데이터 받아옴
  useEffect(() => {
    const ws = new WebSocket('wss://api.upbit.com/websocket/v1')

    ws.onopen = () => { 
      console.log('websocket connected')
      ws.send(JSON.stringify([ 
        {ticket: 'coin_list'}, 
        {type: 'ticker', codes: coins.map(c => c.market)}
      ]))
    }

    ws.onmessage = (e) => {
      const reader = new FileReader()
      reader.onload = () => {
        const data = JSON.parse(reader.result as string)

        setPrices(prev => ({
          ...prev,
          [data.code]:{
            trade_price: data.trade_price, //*현재가
            change_rate: data.signed_change_rate, //*전일대비 퍼센트
            acc_price: data.acc_trade_price_24h, //* 거래대금
            change_price: data.signed_change_price
          }
        }))
      }
      reader.readAsText(e.data) 
    }
    return () => {
      ws.close()
    }
    
  },[coins])

  const firstPage = (page-1)* CoinPage
  const coinPerPage = coins.slice(firstPage, firstPage + CoinPage)
  

  const time = new Date().toLocaleString()
  
  return (
    <StyledContainer>
      <StyledTitle>
        <h2>실시간 코인</h2>
        <p>{time}</p>
      </StyledTitle>
      <StyledTable>
        <StyledTableHead>
          <tr>
            <th className="text-center"  style={{ width: '70px' }}>관심</th>
            <th className="text-center">코인</th>
            <th className="text-right">현재가</th>
            <th className="text-right">전일대비</th>
            <th className="text-right">거래대금(24H)</th>
          </tr>
        </StyledTableHead>
        <StyledTableBody>
          {coinPerPage.map(coin => {
            const priceData = prices[coin.market]
            const coinUnit = coin.market.split('-')[1]
            const coinLogo = `https://static.upbit.com/logos/${coinUnit}.png`
            return(
              <tr>
                <td className="text-center"  style={{ width: '70px' }}>
                  별모양
                </td>
                <td>
                  <div className="flex text-left gap-2 items-center">
                    <img src={coinLogo} alt="로고" width='30' height='30'/>
                    <span className="text-left">{coin.korean_name}</span>
                  </div>
                </td>
                <td className="text-right">{priceData ? 
                `${priceData.trade_price.toLocaleString()}krw`
                  : "Loading..."
                  }</td>
                  <td className="text-right">{priceData ?
                    priceData.change_rate > 0 ? 
                    <div className="text-red-600">
                      <p>{priceData.change_rate.toLocaleString()} %</p> 
                      <p>{priceData.change_price.toLocaleString()}</p>
                    </div>
                    : 
                    <div className="text-blue-700 ">
                      <p>{priceData.change_rate.toLocaleString()} %</p>
                      <p>{priceData.change_price.toLocaleString()}</p>
                    </div>
                    : "Loading..."}
                  </td>
                  <td className="text-right">
                    {priceData ? 
                    `${Math.floor(priceData.acc_price/1000000).toLocaleString()}백만`
                    : "Loading..."
                    }
                  </td>


              </tr>
            )
          })}
        </StyledTableBody>
      </StyledTable>
      <StyledPageBtns>
        {Array.from( {length: Math.ceil(coins.length / CoinPage)}, (_, i) => (
          <button
            key={i+1} 
            onClick={() => {
              setPage(i+1); 
              setSelectedPage(i+1)}
            }
            className={`${selectedPage === i + 1 ? 
              'bg-red-500 text-white flex items-center justify-center' 
              : 
              'bg-white text-black flex items-center justify-center'} p-2 rounded`}
          >{i+1}</button>
        ))}
      </StyledPageBtns>
      
    </StyledContainer>
  )
}
export default CoinChartComponent
