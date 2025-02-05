
import { useEffect, useState } from 'react'
import { StyledBox, StyledBtns, StyledContainer, StyledGuestBtn, StyledLoginBtn, StyledLogo, StyledText } from './style'
import { GuidComponent } from '../../components';


const LandingPage = () => {
  const [context, setContext] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [guestModal, setGuestModal] = useState<boolean>(false)


    const handleCloseModal = () => {
        setGuestModal(false)
    }

  const text = 'Welcome to Virtual Coin'


  const handleModalClick = () => {
    setGuestModal(true)
  }


  useEffect(() => {
    if (currentIndex >= text.length) return;

    const interval = setInterval(() => {
      setContext(prev => prev + text[currentIndex])
      setCurrentIndex(prev => prev + 1)
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

        <StyledBtns>
          <StyledGuestBtn onClick={handleModalClick}>
              Guest
          </StyledGuestBtn>
          <StyledLoginBtn>
            <img src="./kakao.png" alt="카톡아이콘" /><p>Login</p>
          </StyledLoginBtn>
        </StyledBtns>

        { guestModal && <GuidComponent handleCloseModal={handleCloseModal} />} 

      </StyledBox>

    </StyledContainer>
  )
}

export default LandingPage
