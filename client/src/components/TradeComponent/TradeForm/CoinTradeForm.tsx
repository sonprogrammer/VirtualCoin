import { useEffect, useMemo, useRef, useState } from 'react'
import { StyledAmountInput, StyledAmountRate, StyledAsset, StyledBtns, StyledCoinAmount, StyledCoinPrice, StyledContainer, StyledTotalOrder, StyledTradeInput } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGetAssetData from '../../../hooks/useGetAssetData';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../context/userState';
import usePostBuyTrade from '../../../hooks/usePostBuyTrade';
import usePostSellTrade from '../../../hooks/usePostSellTrade';
import { selectedCoinPrice } from '../../../context/selectedCoinPrice';
import { useSelectedCoinInfo } from '../../../hooks/useGetSelectedCoinInfo';


interface CoinTradeFormProps {
  name: string; // 매수인지 매도 인지
}


const CoinTradeForm = ({ name }: CoinTradeFormProps) => {
  const { coinEName } = useParams() // KRW-XRP이런식으로 나옴
  const user = useRecoilValue(userState)
  const marketArray = useMemo(() => (coinEName ? [coinEName] : []), [coinEName]);
  // * 현재 페이지의 코인 실시간 가격
  const coinInfoMaps = useRecoilValue(selectedCoinPrice(marketArray));
  const currentPrice = coinEName ? coinInfoMaps[coinEName]?.trade_price : undefined;
  //* 코인 이름
  const { coinData: coinName } = useSelectedCoinInfo(coinEName ?? '')


  const { mutate: postBuyTrade } = usePostBuyTrade()
  const { mutate: postSellTrade } = usePostSellTrade()

  // * 사용자가 보유하고 있는 자산 + 코인정보
  const { data: assetData, isLoading, refetch } = useGetAssetData()

  // * 주문수량
  const [orderAmount, setOrderAmount] = useState<number>(0);
  // * 팔수 있는양(갖고 있는 코인수량) - 매도용



  //*트레이드 가격(매도/매수)
  const [tradePrice, setTradePrice] = useState<number>(0)
  const isInitialized = useRef(false)

  // * 초기 가격 설정 - 실시간 가격에 따라 계속 변경되면 안되니깐 for ux
  useEffect(() => {
    if (currentPrice && !isInitialized.current) {
      setTradePrice(currentPrice);
      isInitialized.current = true;
    }
  }, [currentPrice]);

  // * 현재 보유하고 있는 코인들중 현재 들어와있는 코인 페이지의 코인에 대한 데이터 및 캐시
  const { cash, availableAmount } = useMemo(() => ({
    cash: assetData?.cash ?? 0,
    availableAmount: assetData?.coins.find(c => c.market === coinEName)?.amount ?? 0
  }), [assetData, coinEName])

  if (!currentPrice) {
    return <div>데이터 불러오는 중...</div>;
  }


  if (isLoading || !coinEName) {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center gap-3 bg-zinc-950">
        <div className="w-10 h-10 border-4 border-zinc-800 border-t-sky-500 rounded-full animate-spin" />
        <p className="text-zinc-500 text-xs font-medium animate-pulse">데이터를 불러오는 중...</p>
      </div>
    );
  }


  const handleSubmit = () => {
    const total = orderAmount * tradePrice

    if (orderAmount <= 0) {
      toast.error('주문 수량을 0보다 크게 입력하세요');
      return;
    }

    if (name === '매도') {
      if (availableAmount < orderAmount) {
        toast.error('보유 코인 수량이 부족합니다')
        return
      }
      if (orderAmount <= 0) {
        toast.error('주문수량을 확인하세요')
        return
      }
      if (coinEName && coinName && user._id && orderAmount <= availableAmount) {
        toast.success(`매도 주문 완료`, {
          autoClose: 1000,
          hideProgressBar: true,
        });

        postSellTrade({
          market: coinEName,
          name: coinName.korean_name,
          amount: orderAmount,
          avgSellPrice: tradePrice,
          userId: user._id,
        })
        refetch()
      }
    } else if (name === '매수') {
      if (cash < total) {
        toast.error('잔액이 부족합니다')
        return
      }
      if (orderAmount <= 0) {
        toast.error('주문수량을 확인하세요')
        return
      }
      if (coinEName && coinName?.korean_name && user._id && orderAmount > 0) {
        toast.success(`매수 주문 완료`, {
          autoClose: 1000,
          hideProgressBar: true,
        });
        postBuyTrade({
          market: coinEName,
          name: coinName.korean_name,
          amount: orderAmount,
          avgBuyPrice: tradePrice,
          userId: user._id,
        });
        refetch()
      } else {
        toast.error('수량을 확인하세요.');
      }
    }
  };



  const handleOrderClick = (percentage: number) => {
    if (name === '매수') {

      if (cash > 0) {
        const calculatedAmount = (cash * (percentage / 100)) / tradePrice;
        setOrderAmount(calculatedAmount);
      } else {
        toast.error('잔액이 부족합니다.');
      }
    } else {
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
            onChange={(e) => setTradePrice(Number(e.target.value.replace(/,/g, '')))}
          />
          <button onClick={() => setTradePrice(p => p - 1)}>-</button>
          <button onClick={() => setTradePrice(p => p + 1)}>+</button>
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
        <button onClick={() => { setOrderAmount(0); setTradePrice(currentPrice ?? 0); }}>
          <FontAwesomeIcon icon={faRotateRight} />
          <span>초기화</span>
        </button>
        <button
          className={`${name === '매도' ? 'bg-sky-600 hover:bg-sky-500' : 'bg-red-600 hover:bg-red-500'} text-white`}
          onClick={handleSubmit}
        >{name}</button>
      </StyledBtns>

    </StyledContainer>
  )
}

export default CoinTradeForm
