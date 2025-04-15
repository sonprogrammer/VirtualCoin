
import { useEffect, useState } from 'react'
import { StyledBox, StyledBtns, StyledContainer, StyledGuestBtn, StyledLoginBtn, StyledLogo, StyledText } from './style'
import { GuidComponent } from '../../components';
import KakaoLogin from 'react-kakao-login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import useKakaoLogin from '../../hooks/useKakaoLogin';


const LandingPage = () => {
  const [context, setContext] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [guestModal, setGuestModal] = useState<boolean>(false)

  // const apiUrl = import.meta.env.VITE_API_URL;

  // console.log('apiUrl', apiUrl); 

  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID || '';

  const { handleKakaoSuccess, handleKakaoFailure } = useKakaoLogin();


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
          <KakaoLogin
            token={kakaoClientId}
            onSuccess={handleKakaoSuccess}
            onFail={handleKakaoFailure}
            render={(props) => (
                <img
                  src="./kakao.png"
                  alt="카톡아이콘"
                  style={{ cursor: 'pointer' }}
                  onClick={props.onClick}  
                />
              )}
            />
          </StyledLoginBtn>
        </StyledBtns>

        { guestModal && <GuidComponent handleCloseModal={handleCloseModal} />} 

      </StyledBox>
      <ToastContainer position="top-center" />


    </StyledContainer>
  )
}

export default LandingPage
