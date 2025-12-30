import styled, { keyframes } from "styled-components";
import tw from "twin.macro";

const blink = keyframes`
  50% { opacity: 0; }
`;

export const StyledContainer = styled.div`
  ${tw`
    relative h-screen w-full flex items-center justify-center overflow-hidden
  `}
  background: linear-gradient(
      rgba(0, 0, 0, 0.6), 
      rgba(0, 0, 0, 0.7)
    ),
    url('/landingbg.webp');
  background-size: cover;
  background-position: center;
`;

export const StyledBox = styled.div`
  ${tw`
    flex flex-col justify-center items-center 
    w-full max-w-4xl px-6 gap-8 z-10
  `}
`;

export const StyledLogo = styled.div`
  ${tw`
    w-40 md:w-64 mb-4
    transition-all duration-500
  `}
  img {
    ${tw`w-full h-auto drop-shadow-2xl`}
    /* 로고가 로드될 때 살짝 위아래로 움직이는 효과 */
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;

export const StyledText = styled.h1`
  ${tw`
    text-2xl md:text-5xl font-extrabold text-white text-center
    tracking-tight min-h-[1.5em] flex items-center
  `}
  /* 타이핑 커서 스타일 */
  &::after {
    content: '|';
    animation: ${blink} 1s step-end infinite;
    ${tw`text-red-500 ml-1`}
  }
`;

export const StyledBtns = styled.div`
  ${tw`
    flex flex-col md:flex-row gap-4 md:gap-8 w-full justify-center items-center mt-8
  `}
`;

const ButtonBase = tw.button`
  flex items-center justify-center gap-3
  px-8 h-14 rounded-full font-bold text-lg
  transition-all duration-300 transform
  hover:scale-105 active:scale-95
  w-full md:w-64 shadow-lg
  box-border
`;

export const StyledLoginBtn = styled(ButtonBase)`
  ${tw`bg-red-600 text-white hover:bg-red-700 shadow-red-900/20`}
  
  img {
    ${tw`w-6 h-6 object-contain`}
  }
`;

export const StyledGuestBtn = styled(ButtonBase)`
  ${tw`bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20`}
`;