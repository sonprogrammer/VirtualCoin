
import { useEffect, useState } from 'react'
import { StyledBox, StyledBtns, StyledContainer, StyledGuestBtn, StyledLoginBtn, StyledLogo, StyledText } from './style'
import { GuidComponent } from '../../components';
import KakaoLogin from 'react-kakao-login';
import useKakaoLogin from '../../hooks/useKakaoLogin';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../context/userState';


const LandingPage = () => {
  const [context, setContext] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [guestModal, setGuestModal] = useState<boolean>(false)

  const navigate = useNavigate()

  const user = useRecoilValue(userState)
  
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID || '';

  const { handleKakaoSuccess, handleKakaoFailure } = useKakaoLogin();

  useEffect(() => {

   if(user?._id){
      navigate('/browse')
   } 
  }, [user])



  const text = 'Welcome to Virtual Coin'



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
        <StyledGuestBtn onClick={() => setGuestModal(true)}>
            게스트로 시작하기
          </StyledGuestBtn>
          <KakaoLogin
            token={kakaoClientId}
            onSuccess={handleKakaoSuccess}
            onFail={handleKakaoFailure}
            render={(props) => (
              <StyledLoginBtn onClick={props.onClick} type="button">
              <img src="./kakao.png" alt="kakao" />
              <span>카카오 로그인</span>
            </StyledLoginBtn>
              )}
            />
        </StyledBtns>

        {guestModal && <GuidComponent handleCloseModal={() => setGuestModal(false)} />}

      </StyledBox>


    </StyledContainer>
  )
}

export default LandingPage
