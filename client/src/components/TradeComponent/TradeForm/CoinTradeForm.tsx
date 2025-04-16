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
  if(isLoading && !coin && !coinId){
    return <div>loading...</div>
  }
const { mutate: postBuyTrade} = usePostBuyTrade()
const { mutate: postSellTrade} = usePostSellTrade()



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

    useEffect(() => {
      if (coinId && coin[coinId] && coin[coinId].trade_price !== 0 && currentPrice === null) {
        setCurrentPrice(coin[coinId].trade_price);  
        setTradePrice(coin[coinId].trade_price)
      }
    }, [coinId, coin, currentPrice]);

    useEffect(() => {
      if (coinId && coin[coinId]) {
        const newPrice = coin[coinId].trade_price;
        setCurrentPrice(newPrice);
        setTradePrice(newPrice);
      }
    }, [coinId, coin]);

    if(currentPrice === null){
      return <div>loading...</div>
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
        {/*//* 현재 로그인한 사람의 보유 현금  */}
        <p><strong>{cash?.toLocaleString()} 원</strong></p>
      </StyledAsset>
      <StyledCoinPrice>
        <p>{name}가격(KRW)</p>
        <StyledTradeInput>
            {/* //*인풋창에 코인의 가격이 들어가고 거기서 더 낮은 금액에
            //* 사고 싶으면 그가격에 예약을 걸어놈
             */}
          <input type="string" 
            value={tradePrice?.toLocaleString()} 
            onChange={(e) => {
              const value = e.target.value.replace(/,/g, '')
              setTradePrice(Number(value))
          }}

            />
          <button onClick={handleMinusClick}>-</button>
          <button onClick={handlePlusClick}>+</button>
        </StyledTradeInput>
      </StyledCoinPrice>

      <StyledCoinAmount>
        <StyledAmountInput>
            <p>주문수량</p>
            <input type="number"
               value={orderAmount}
               onChange={(e) => setOrderAmount(Number(e.target.value))}
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
        <p><strong>{(orderAmount * tradePrice)?.toLocaleString()}</strong> 원</p>
      </StyledTotalOrder>

      <StyledBtns>
        <button onClick={handleResetClick}>
            <FontAwesomeIcon icon={faRotateRight} />
            <span>초기화</span>
        </button>
        <button 
            className={`${name === '매도' ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'} px-4 py-2 rounded`}
            onClick={handleSubmit}
        >{name}</button>
      </StyledBtns>
      <ToastContainer position="top-center" />

      
    </StyledContainer>
  )
}

export default CoinTradeForm
