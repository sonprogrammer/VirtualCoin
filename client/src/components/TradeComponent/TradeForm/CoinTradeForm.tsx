import React, { useState } from 'react'
import { StyledAmountInput, StyledAmountRate, StyledAsset, StyledBtns, StyledCoinAmount, StyledCoinPrice, StyledContainer, StyledTotalOrder, StyledTradeInput } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';


const CoinTradeForm = () => {
    //*coinPrice의 초기값은 업비트 api에서 코인별로 불러와야함
    const [coinPrice, setCoinPrice] = useState<number>(0)


    const handleMinusClick = () => {
        if (coinPrice > 0) {
            setCoinPrice(coinPrice - 1);
        }
    }
    const handlePlusClick = () => {
        setCoinPrice(coinPrice + 1 )
    }
    
  return (
    <StyledContainer>
      <StyledAsset>
        <p>주문가능</p>
        {/*//* 현재 로그인한 사람의 보유 현금  */}
        <p><strong>현재보유자산</strong> 원</p>
      </StyledAsset>
      <StyledCoinPrice>
        <p>매수가격(KRW)</p>
        <StyledTradeInput>
            {/* //*인풋창에 코인의 가격이 들어가고 거기서 더 낮은 금액에
            //* 사고 싶으면 그가격에 예약을 걸어놈
             */}
          <input type="number" placeholder={coinPrice.toString()}/>
          <button onClick={handleMinusClick}>-</button>
          <button onClick={handlePlusClick}>+</button>
        </StyledTradeInput>
      </StyledCoinPrice>

      <StyledCoinAmount>
        <StyledAmountInput>
            <p>주문수량</p>
            <input type="number" placeholder='0'/>
        </StyledAmountInput>
        <StyledAmountRate>
          <button>10%</button>
          <button>25%</button>
          <button>50%</button>
          <button>100%</button>
        </StyledAmountRate>
      </StyledCoinAmount>

      <StyledTotalOrder>
        <p>주문총액 (KRW)</p>
        {/* //*데이터 받아와야함 */}
        <p><strong>주문한 금액</strong> 원</p>
      </StyledTotalOrder>

      <StyledBtns>
        <button>
            <FontAwesomeIcon icon={faRotateRight} />
            초기화
        </button>
        <button>매수</button>
      </StyledBtns>
      
    </StyledContainer>
  )
}

export default CoinTradeForm
