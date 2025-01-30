import React from 'react'
import { StyledBox, StyledContainer, StyledContent, StyledLogo } from './style'


interface InfoModalProps{
    closeModal: () => void;
}
const InfoModal = ({closeModal} : InfoModalProps) => {
  return (
    <StyledContainer onClick={closeModal}>
      <StyledBox onClick={(e: React.MouseEvent) => e.stopPropagation() }>
        <StyledLogo>
            <img src="/alpha.png" alt="logo" />
        </StyledLogo>

        <StyledContent>
            저희 VC는 코인투자를 입문하시는 분들을 위해
            배움의 경험을 제공합니다.
            실제 코인의 유동성을 바탕으로 저희 웹사이트에서만의
            가상 자산을 지급후 유사 모의 투자를 진행 할 수 있는
            시스템입니다.<br/>
            <p>    
            경고 : 가상의 돈임을 명시하고, 실제 출금, 입금은 
            발생하지 않는다.
            </p>
        </StyledContent>
    
      </StyledBox>
    </StyledContainer>
  )
}

export default InfoModal
