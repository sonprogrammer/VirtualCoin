import React from 'react'
import { StyledCoin, StyledContainer, StyledContent, StyledContentTitle, StyledModal } from './style';

type Coin = {
    name: string;
    yester: string;
    current: string;
  };
  
  interface CoinModalProps {
    title: string;
    coinData: Coin[];
    onClickOutside: () => void;
  }
const CoinModal = ({title, coinData, onClickOutside} : CoinModalProps) => {
  return (
    <StyledContainer onClick={onClickOutside}>
    <StyledModal onClick={e => e.stopPropagation()}>
      <p>{title}</p>
      <StyledContentTitle>
        <p>코인</p>
        <p>현재가</p>
        <p>전일대비</p>
      </StyledContentTitle>
      <StyledContent>
      {/* // TODO: 태그 수정하기(현재는 목업데이터 들어와있음) 전일 대비 상승이면 빨강 하락이면 파랑으로 글자색넣기 */}
        {coinData.map((a, index) => (
          <StyledCoin key={index}>
            <div>{a.name}</div>
            <div>{a.yester}</div>
            <div>{a.current}</div>
          </StyledCoin>
        ))}
      </StyledContent>
    </StyledModal>
  </StyledContainer>
  )
}

export default CoinModal
