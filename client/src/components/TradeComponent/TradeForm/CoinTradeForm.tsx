import React, { useState } from 'react'
import { StyledAmountInput, StyledAmountRate, StyledAsset, StyledBtns, StyledCoinAmount, StyledCoinPrice, StyledContainer, StyledTotalOrder, StyledTradeInput } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';


interface CoinTradeFormProps{
    name: string;
}

const mockData = {
    userBalance: 500000, 
    coins: [
      { name: '비트코인', price: 72000000, availableAmount: 0.01 },
      { name: '이더리움', price: 3500000, availableAmount: 1.5 },
      { name: '리플', price: 950, availableAmount: 1000 },
    ],
  };
  


const CoinTradeForm = ({name} : CoinTradeFormProps) => {
    //*coinPrice의 초기값은 업비트 api에서 코인별로 불러와야함
    const [coinPrice, setCoinPrice] = useState<number>(mockData.coins[0].price)
    const [userBalance, setUserBalance] = useState<number>(mockData.userBalance)
    const [orderAmount, setOrderAmount] = useState<number>(mockData.coins[0].availableAmount);


    const handleMinusClick = () => {
        if (coinPrice > 0) {
            setCoinPrice(coinPrice - 1);
        }
    }
    const handlePlusClick = () => {
        setCoinPrice(coinPrice + 1 )
    }

    const handleOrderClick = (percentage: number) => {
      const calculatedAmount = (userBalance * (percentage / 100)) / coinPrice;
      setOrderAmount(calculatedAmount);
  };

    
  return (
    <StyledContainer>
      <StyledAsset>
        <p>주문가능</p>
        {/*//* 현재 로그인한 사람의 보유 현금  */}
        <p><strong>{mockData.userBalance.toLocaleString()} 원</strong></p>
      </StyledAsset>
      <StyledCoinPrice>
        <p>{name}가격(KRW)</p>
        <StyledTradeInput>
            {/* //*인풋창에 코인의 가격이 들어가고 거기서 더 낮은 금액에
            //* 사고 싶으면 그가격에 예약을 걸어놈
             */}
          <input type="number" value={coinPrice.toString()} onChange={(e) => setCoinPrice(Number(e.target.value))}/>
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
        <p>주문총액 (KRW)</p>
        {/* //*데이터 받아와야함 */}
        <p><strong>{(orderAmount * coinPrice).toLocaleString()}</strong> 원</p>
      </StyledTotalOrder>

      <StyledBtns>
        <button>
            <FontAwesomeIcon icon={faRotateRight} />
            초기화
        </button>
        <button 
            className={`${name === '매도' ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'} px-4 py-2 rounded`}
        >{name}</button>
      </StyledBtns>
      
    </StyledContainer>
  )
}

export default CoinTradeForm
