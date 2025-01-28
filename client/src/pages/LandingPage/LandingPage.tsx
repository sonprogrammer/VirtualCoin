
import { useEffect, useState } from 'react'
import { StyledBox, StyledContainer, StyledLoginBtn, StyledLogo, StyledText } from './style'
import { LoginModal } from '../../components';

const LandingPage = () => {
  const [context, setContext] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false)
  const text = 'Welcome to Virtual Coin'

  const modalOpenClicked = () => {
    setLoginModalOpen(true)
  }

  const closeModal = () => {
    setLoginModalOpen(false)
  }

  useEffect(() =>{
    if(currentIndex >= text.length) return;

    const interval = setInterval(() => {
        setContext(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev+1)
    }, 200);

    return () => clearInterval(interval)
  }, [currentIndex])
  
  
  return (
    <StyledContainer>
      <StyledBox>
        <StyledLogo>
          <img src="alpha.png" alt="logo" />
        </StyledLogo>

        <StyledText>
          {context}
        </StyledText>
        <StyledLoginBtn onClick={modalOpenClicked}>
          login / singup
        </StyledLoginBtn>
        { loginModalOpen ? (<LoginModal closeModal={closeModal}/>) : ''}
      </StyledBox>

    </StyledContainer>
  )
}

export default LandingPage
