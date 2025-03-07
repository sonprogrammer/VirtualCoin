
import { useEffect, useState } from 'react'
import { StyledBox, StyledBtns, StyledContainer, StyledGuestBtn, StyledLoginBtn, StyledLogo, StyledText } from './style'
import { GuidComponent } from '../../components';
import KakaoLogin from 'react-kakao-login';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';


const LandingPage = () => {
  const [context, setContext] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [guestModal, setGuestModal] = useState<boolean>(false)

  const navigate = useNavigate()

  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID || '';


    const handleCloseModal = () => {
        setGuestModal(false)
    }

  const text = 'Welcome to Virtual Coin'


  const handleModalClick = () => {
    setGuestModal(true)
  }


  const resKakao = (data:any) => {
    console.log('data', data)
    const { id, kakao_account } =data.profile
    const userName = kakao_account.profile.nickname

    if (data) {
      toast.success(`로그인 성공!`,{
        autoClose: 1000, 
        hideProgressBar: true,
      });
    } 
    setTimeout(() => {
      navigate('/browse');
    }, 1000);
  }
  
  const kakaoOnFailure = (error: any) => {
    console.log('카톡 로그인 오류', error);
};
  





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
            onSuccess={resKakao}
            onFail={kakaoOnFailure}
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
