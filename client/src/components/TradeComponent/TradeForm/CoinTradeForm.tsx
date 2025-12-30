import { useEffect, useState } from 'react'
import { StyledAmountInput, StyledAmountRate, StyledAsset, StyledBtns, StyledCoinAmount, StyledCoinPrice, StyledContainer, StyledTotalOrder, StyledTradeInput } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGetAssetData from '../../../hooks/useGetAssetData';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { CoinPrice } from '../../../context/CoinPrice';
import { coinKName } from '../../../context/coinKName';
import { userState } from '../../../context/userState';
import usePostBuyTrade from '../../../hooks/usePostBuyTrade';
import usePostSellTrade from '../../../hooks/usePostSellTrade';


interface CoinTradeFormProps{
    name: string;
}


const CoinTradeForm = ({name} : CoinTradeFormProps) => {
  const {data, isLoading, refetch} = useGetAssetData()
  const { coinId } = useParams()
  const coin = useRecoilValue(CoinPrice)
  const user = useRecoilValue(userState)
 
const { mutate: postBuyTrade} = usePostBuyTrade()
const { mutate: postSellTrade} = usePostSellTrade()


if (isLoading || !coin || !coinId) {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-3 bg-zinc-950">
      {/* 테일윈드로 만든 스피너 */}
      <div className="w-10 h-10 border-4 border-zinc-800 border-t-sky-500 rounded-full animate-spin" />
      <p className="text-zinc-500 text-xs font-medium animate-pulse">데이터를 불러오는 중...</p>
    </div>
  );
}
  const cash = data?.cash || 0


    //* 코인 현재가격
    const [currentPrice, setCurrentPrice] = useState<number | null>(null)
    //*트레이드 가격(매도/매수)
    const [tradePrice, setTradePrice] = useState<number>(0)
    // * 주문수량
    const [orderAmount, setOrderAmount] = useState<number>(0);
    // * 팔수 있는양(갖고 있는 코인수량) - 매도용
    const [availableAmount, setAvailableAmount] = useState<number>(0)


    //*코인 한국이름
    const kName = useRecoilValue(coinKName)

    useEffect(() => {
      if(data?.coins){
        const coinData = data.coins.find((c:any)=> c.market === coinId)
        if(coinData){
          setAvailableAmount(coinData.amount)
        }
      }
    },[data, coinId])

    useEffect(()=>{
      setCurrentPrice(null)
    },[coinId])

    useEffect(() => {
      if (coinId && coin[coinId] && coin[coinId].trade_price !== 0 && currentPrice === null) {
        setCurrentPrice(coin[coinId].trade_price);  
        setTradePrice(coin[coinId].trade_price)
      }
    }, [coinId, coin, currentPrice]);




    if (currentPrice === null) {
      return (
        <div className="h-full w-full flex flex-col justify-center items-center bg-zinc-950 p-6">
          {/* 커스텀 테일윈드 스피너 */}
          <div className="relative flex items-center justify-center mb-4">
            <div className="w-12 h-12 border-4 border-zinc-800 rounded-full"></div>
            <div className="absolute w-12 h-12 border-4 border-t-red-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
          
          {/* 로딩 텍스트 */}
          <div className="flex flex-col items-center gap-1">
            <p className="text-zinc-200 text-sm font-bold tracking-tight">
              실시간 시세 연결 중
            </p>
            <p className="text-zinc-500 text-[11px]">
              잠시만 기다려 주세요...
            </p>
          </div>
    
          {/* 하단에 살짝 보이는 스켈레톤 가이드 (선택 사항) */}
          <div className="w-full mt-8 opacity-20 px-4">
            <div className="h-4 bg-zinc-800 rounded w-1/2 mb-4 animate-pulse"></div>
            <div className="h-10 bg-zinc-900 rounded-xl w-full mb-2 animate-pulse"></div>
            <div className="h-10 bg-zinc-900 rounded-xl w-full animate-pulse"></div>
          </div>
        </div>
      );
    }

    
  
    const handleSubmit = () => {
      const total = orderAmount * tradePrice
      // 알림 띄우기
      if (name === '매도') {
        if(availableAmount < orderAmount){
          toast.error('보유 코인 수량이 부족합니다')
          return
        }
        if(orderAmount <= 0){
          toast.error('주문수량을 확인하세요')
          return
        }
        if(coinId && kName && user._id && orderAmount <= availableAmount){
          toast.success(`매도 주문 완료`,{
            autoClose: 1000, 
          hideProgressBar: true,
          });
          setAvailableAmount(prv=> prv - orderAmount)

          postSellTrade({
            market: coinId,
            name: kName,
            amount: orderAmount,
            avgSellPrice: tradePrice,
            userId: user._id,
            cash: cash
          })
          refetch()
        }
      } else if (name === '매수') {
        if(cash < total){
          toast.error('잔액이 부족합니다')
          return
        }
        if(orderAmount <= 0){
          toast.error('주문수량을 확인하세요')
          return
        }
        if (coinId && kName && user._id && orderAmount > 0) {
          toast.success(`매수 주문 완료`,{
            autoClose: 1000, 
            hideProgressBar: true,
          });
          setAvailableAmount(prv=> prv + orderAmount)
          postBuyTrade({
            market: coinId,
            name: kName,
            amount: orderAmount,
            avgBuyPrice: tradePrice,
            userId: user._id,
            cash: cash
          });
          refetch()
        } else {
          toast.error('수량을 확인하세요.');
        }
      }
    };
    

    const handleMinusClick = () => {
        setTradePrice(prev => prev-1)
    }
    const handlePlusClick = () => {
      setTradePrice(prev=> prev + 1 )
    }

    const handleResetClick = () => {
      setOrderAmount(0)
      setTradePrice(currentPrice)
    }

    const handleOrderClick = (percentage: number) => {
      if(name ==='매수'){

        if (cash > 0) {
          const calculatedAmount = (cash * (percentage / 100)) / tradePrice;
          setOrderAmount(calculatedAmount);
        } else {
          toast.error('잔액이 부족합니다.');
        }
      }else{
        const calculatedAmount = availableAmount * (percentage / 100)
        setOrderAmount(calculatedAmount)
      }
  };

    
  return (
    <StyledContainer>
      <StyledAsset>
        <p>주문가능</p>
        <p><strong className="text-white">{Math.round(cash)?.toLocaleString()}</strong> <span className="text-zinc-500 text-xs">KRW</span></p>
      </StyledAsset>

      <StyledCoinPrice>
        <p className="text-xs text-zinc-500 font-bold">{name}가격(KRW)</p>
        <StyledTradeInput>
          <input 
            type="text" 
            value={tradePrice?.toLocaleString()} 
            onChange={(e) => {
              const value = e.target.value.replace(/,/g, '')
              setTradePrice(Number(value))
            }}
          />
          <button onClick={handleMinusClick} className="text-xl">-</button>
          <button onClick={handlePlusClick} className="text-xl">+</button>
        </StyledTradeInput>
      </StyledCoinPrice>

      <StyledCoinAmount>
        <StyledAmountInput>
            <p>주문수량</p>
            <input 
               type="number"
               value={orderAmount}
               onChange={(e) => setOrderAmount(Number(e.target.value))}
               placeholder="0"
            />
        </StyledAmountInput>
        <StyledAmountRate>
            <button onClick={() => handleOrderClick(10)}>10%</button>
            <button onClick={() => handleOrderClick(25)}>25%</button>
            <button onClick={() => handleOrderClick(50)}>50%</button>
            <button onClick={() => handleOrderClick(100)}>100%</button>
        </StyledAmountRate>
      </StyledCoinAmount>

      <StyledTotalOrder>
        <p>주문총액</p>
        <p><strong>{(orderAmount * tradePrice)?.toLocaleString()}</strong> <span className="text-zinc-500 text-xs font-normal">KRW</span></p>
      </StyledTotalOrder>

      <StyledBtns>
        <button onClick={handleResetClick}>
            <FontAwesomeIcon icon={faRotateRight} />
            <span>초기화</span>
        </button>
        <button 
            className={`${name === '매도' ? 'bg-sky-600 hover:bg-sky-500' : 'bg-red-600 hover:bg-red-500'} text-white`}
            onClick={handleSubmit}
        >{name}</button>
      </StyledBtns>

      {/* 토스트 알림 다크테마 적용 */}
      <ToastContainer position="top-center" theme="dark" />
    </StyledContainer>
  )
}

export default CoinTradeForm
