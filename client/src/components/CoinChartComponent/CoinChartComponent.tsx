import { useEffect, useState } from "react"
import axios from 'axios'
import { StyledContainer, StyledPageBtns, StyledTable, StyledTableBody, StyledTableHead, StyledTitle } from "./style"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import useWebSocket from "../../hooks/useWebSocket";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { CoinPrice } from "../../context/CoinPrice";
import useLikeToggle from "../../hooks/useLikeToggle";
import { userState } from "../../context/userState";


const CoinChartComponent = () => {
  const [coins, setCoins] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [star, setStar] = useState<string[]>([]) //*관심코인 관리 
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); 
  const [user, setUser] = useRecoilState(userState);
  
  const navigate = useNavigate()

  useLikeToggle

  const [prices] = useRecoilState(CoinPrice); 

  useWebSocket(coins)


  const handleCoinClick = (coinId: string) => {
    navigate(`/coin/${coinId}`)
  }


  // TODO useGetCoins훅으로 교체하기
  //*코인 데이터 가져오기(100개) - rest api로 (고정된 값이니깐 변할일 없어서 )
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://api.upbit.com/v1/market/all')
        const krwCoins = res.data.filter((coin: any) => coin.market.startsWith("KRW-"));
        setCoins(krwCoins);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])


  // const prices = useWebSocket(coins);
  // const { data: coinData, isLoading, isError } = useGetCoins()

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }
  
  // if (isError) {
  //   return <p>Error occurred while fetching coin data.</p>;
  // }
  
  // console.log('price', prices)


  // useEffect(() => {
  //   if(coinData){
  //     setCoins(coinData)
  //   }
  // },[coinData])
  
  const sortCoinByVolume = (order: 'asc' | 'desc') => {
    setCoins(prevCoins => 
      [...prevCoins].sort((a, b) => {
        const tradeVolumeA = prices[a.market]?.acc_price || 0;
        const tradeVolumeB = prices[b.market]?.acc_price || 0;
        return order === 'asc' ? tradeVolumeA - tradeVolumeB : tradeVolumeB - tradeVolumeA;
      })
    );
    setSortOrder(order);
  };
  // const { toggleLike, likedCoins, isLoading, isError } = useLikeToggle();


  
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  





useEffect(() => {
  if (user.isGuest) {
    const storedUser = JSON.parse(localStorage.getItem('guestUser') || '{}');
    setStar(storedUser?.interestedCoins || []); // interestedCoins 배열을 상태에 설정
  }
}, [user.isGuest]); 

const handleStarClick = (coinMarket: string) => {
  setStar((prev) => {
    let updatedLike;
    if (prev.includes(coinMarket)) {
      // 관심 목록에서 코인 제거
      updatedLike = prev.filter((coin: string) => coin !== coinMarket);
    } else {
      // 관심 목록에 코인 추가
      updatedLike = [...prev, coinMarket];
    }

    // 업데이트된 관심 코인 배열을 로컬스토리지에 저장
    if (user.isGuest) {
      // 로컬스토리지에서 기존 유저 데이터 가져오기
      const storedUser = JSON.parse(localStorage.getItem('guestUser') || '{}');

      // 기존 데이터를 유지하고 interestedCoins만 업데이트
      const updatedUser = { 
        ...storedUser,
        interestedCoins: updatedLike 
      };

      // 로컬스토리지에 새로운 데이터 저장
      localStorage.setItem('guestUser', JSON.stringify(updatedUser));
    } else {
      // 카카오 로그인인 경우 서버에 데이터 전송
      axios.post(`http://localhost:3000/api/user/${coinMarket}/like`);
    }

    return updatedLike;
  });
};

  const isStar = (coinMarket: string) => star.includes(coinMarket)

  const CoinPage = 10;

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
            <th className="text-center" style={{ width: windowWidth > 570 ? '70px' : '40px' }}>관심</th>
            <th className="text-left">코인</th>
            <th className="text-right">현재가</th>
            <th className="text-right">전일대비</th>
              <th className="text-right">
                <button onClick={() => sortCoinByVolume(sortOrder === 'asc' ? 'desc' : 'asc')}>
                  {sortOrder === 'asc' ? '▲' : '▼'} 거래대금(24H)
                </button>
              </th>
          </tr>
        </StyledTableHead>
        <StyledTableBody>

          {(windowWidth > 630 ? coinPerPage : coins).map(coin => {
            const priceData = prices[coin.market]
            const coinUnit = coin.market.split('-')[1]
            const coinLogo = `https://static.upbit.com/logos/${coinUnit}.png`


            return (
              <tr key={coin.market} onClick={()=>handleCoinClick(coin.market)}>
                {/* //*관심 */}
                <td className="text-center" onClick={(e) => e.stopPropagation()}>
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
                      {priceData.trade_price?.toLocaleString()}
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
                        {(priceData.change_rate * 100).toLocaleString()}%
                      </p>
                      <p>
                        {priceData.change_rate > 0 ? "+" : ""}
                        {priceData.change_price?.toLocaleString()}
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
      { 
        windowWidth > 630 && (

          <StyledPageBtns >
        {Array.from({ length: Math.ceil(coins.length / CoinPage) }, (_, i) => (
          <button
          key={i + 1}
          onClick={() => {
            setPage(i + 1);
          }
        }
        className={`${page === i + 1 ?
          'bg-red-500 text-white flex items-center justify-center'
          :
          'bg-white text-black flex items-center justify-center'} p-2 rounded`}
          >{i + 1}</button>
        ))}
      </StyledPageBtns>
      )}

    </StyledContainer>
  )
}
export default CoinChartComponent
