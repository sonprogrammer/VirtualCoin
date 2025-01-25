import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        h-screen
        `}
        background: linear-gradient(
      rgba(255, 255, 255, 0.3), /* 50% 투명 흰색 */
      rgba(255, 255, 255, 0.5)
    ),
    url('/landingbg.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

`

export const StyledBox = styled.div`
    ${tw`
        flex
        flex-col
        justify-center
        items-center
        h-full
        w-full
        gap-[20px]
        z-10
    `}
`

export const StyledLogo = styled.div`
        ${tw`
            w-[35%]
            flex
            justify-center
        `}
    img{
    ${tw`
            block
            w-[50%]
            h-auto
    `}
    }
`
export const StyledText = styled.div`
        ${tw`
            font-[2rem]
            inline-block
            font-bold
            text-white
            text-3xl
        `}
        span {
     opacity: 0; /* 초기 상태는 숨김 */
        animation: fadeIn 0.5s ease-in forwards;
        animation-delay: calc(var(--i) * 0.1s); /* 각 글자에 딜레이 적용 */
  }
        @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`