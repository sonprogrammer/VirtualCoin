import { useEffect, useState } from "react"
import axios from 'axios'
import { StyledContainer, StyledPageBtns, StyledTable, StyledTableBody, StyledTableHead, StyledTitle } from "./style"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';


const CoinChartComponent = () => {
  const [coins, setCoins] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [prices, setPrices] = useState<{ [key: string]: { trade_price: number, change_rate: number, acc_price: number, change_price: number } }>({})
  const [selectedPage, setSelectedPage] = useState(1);
  const [star, setStar] = useState<string[]>([]) //*관심코인 관리 수월
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])



  const handleStarClick = (coinMarket: string) => {
    setStar(prev => {
      if (prev.includes(coinMarket)) {
        return prev.filter(coin => coin !== coinMarket)
      } else {
        return [...prev, coinMarket]
      }
    })
  }

  useEffect(() => {
    console.log('star', star)
  }, [star])

  const isStar = (coinMarket: string) => star.includes(coinMarket)

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
  }, [])

  // *웹소켓 연결 -> 실시간 코인 가격등 데이터 받아옴
  useEffect(() => {
    const ws = new WebSocket('wss://api.upbit.com/websocket/v1')

    ws.onopen = () => {
      console.log('websocket connected')
      ws.send(JSON.stringify([
        { ticket: 'coin_list' },
        { type: 'ticker', codes: coins.map(c => c.market) }
      ]))
    }

    ws.onmessage = (e) => {
      const reader = new FileReader()
      reader.onload = () => {
        const data = JSON.parse(reader.result as string)

        setPrices(prev => ({
          ...prev,
          [data.code]: {
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

  }, [coins])

  const firstPage = (page - 1) * CoinPage
  const coinPerPage = coins.slice(firstPage, firstPage + CoinPage)


  const time = new Date().toLocaleString()

  return (
    <StyledContainer className="chart">
      <StyledTitle>
        <h2>실시간 코인</h2>
        <p>{time}</p>
      </StyledTitle>
      <StyledTable>
        <StyledTableHead>
          <tr>
            {/* <th className="text-center"  style={{ width: '70px' }}>관심</th> */}
            <th className="text-center" style={{ width: windowWidth > 570 ? '70px' : '40px' }}>관심</th>
            <th className="text-left">코인</th>
            <th className="text-right">현재가</th>
            <th className="text-right">전일대비</th>
            {windowWidth > 570 ? (
              <th className="text-right">거래대금(24H)</th>
            ) : (
              <th className="text-right">거래대금</th>
            )
            }
          </tr>
        </StyledTableHead>
        <StyledTableBody>
          {coinPerPage.map(coin => {
            const priceData = prices[coin.market]
            const coinUnit = coin.market.split('-')[1]
            const coinLogo = `https://static.upbit.com/logos/${coinUnit}.png`
            return (
              <tr>
                {/* //*관심 */}
                <td className="text-center" >
                  {isStar(coin.market) ? (
                    <FontAwesomeIcon
                      icon={fullStar}
                      onClick={() => handleStarClick(coin.market)}
                      className="text-yellow-400"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faStar}
                      onClick={() => handleStarClick(coin.market)}
                    />
                  )
                  }
                </td>

                {/* //*코인 이름&로고 */}
                <td>
                  <div className="flex text-left gap-2 items-center">
                    {windowWidth > 570 &&
                      <img src={coinLogo} alt="로고" width='30' height='30' />
                    }
                    <span className="text-left">{coin.korean_name}</span>
                  </div>
                </td>

                {/* //* 현재가 */}
                <td className="text-right">
                  {priceData ? (
                    <p
                      className={`${priceData.change_rate > 0 ? "text-red-500" : "text-blue-600"
                        } ${windowWidth <= 570 ? "text-[12px] font-bold" : ""}`}
                    >
                      {priceData.trade_price.toLocaleString()}
                      {windowWidth > 570 && "krw"}
                    </p>
                  ) : (
                    "Loading..."
                  )}
                </td>
                  

                {/* //* 전일대비 */}
                <td className="text-right">
                  {priceData ? (
                    <div
                      className={`${priceData.change_rate > 0 ? "text-red-500" : "text-blue-600"
                        } ${windowWidth > 570 ? "" : "text-[12px]"}`}
                    >
                      <p>
                        {priceData.change_rate > 0 ? "+" : ""}
                        {priceData.change_rate.toLocaleString()}%
                      </p>
                      <p>
                        {priceData.change_rate > 0 ? "+" : ""}
                        {priceData.change_price.toLocaleString()}
                      </p>
                    </div>
                  ) : (
                    "Loading..."
                  )}
                </td>


                {/* //*거래대금 */}
                <td className="text-right">
                  {priceData ?
                    <p className={`${windowWidth > 570 ? '' : 'text-[12px]'}`}
                    >
                      {Math.floor(priceData.acc_price / 1000000).toLocaleString()}백만
                    </p>
                    : "Loading..."
                  }
                </td>


              </tr>
            )
          })}
        </StyledTableBody>
      </StyledTable>
      <StyledPageBtns >
        {Array.from({ length: Math.ceil(coins.length / CoinPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => {
              setPage(i + 1);
              setSelectedPage(i + 1)
            }
            }
            className={`${selectedPage === i + 1 ?
              'bg-red-500 text-white flex items-center justify-center'
              :
              'bg-white text-black flex items-center justify-center'} p-2 rounded`}
          >{i + 1}</button>
        ))}
      </StyledPageBtns>

    </StyledContainer>
  )
}
export default CoinChartComponent
