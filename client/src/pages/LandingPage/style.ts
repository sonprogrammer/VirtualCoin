import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        h-screen
        `}
        background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.5)
    ),
    url('/landingbg.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: inset 0px 4px 6px rgba(0, 0, 0, 0.1);
 overflow: hidden;

    /* padding과 border 포함한 크기 계산 */
    box-sizing: border-box;
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
      
`

export const StyledBtns = styled.div`
    ${tw`
        flex
        gap-10
    `}
`


export const StyledLoginBtn = styled.div`
    ${tw`
        bg-red-500
        px-5
        py-2
        rounded-xl
        mt-10
        font-bold
        flex
        items-center
        justify-center
        gap-3
      `}
      &:hover{
      cursor: pointer;
      color: white;
      animation: all 0.7s;
      transform: scale(1.1);
      transition: transform 0.3s;
      }
      img{
        width: 32px;
      }
`
export const StyledGuestBtn = styled.div`
    ${tw`
        bg-gray-700
        px-5
        py-2
        rounded-xl
        mt-10
        font-bold
        text-white
        flex
        items-center
        justify-center
    `}
    &:hover{
      cursor: pointer;
      color: white;
      animation: all 0.7s;
      transform: scale(1.1);
      transition: transform 0.3s;
      }
`