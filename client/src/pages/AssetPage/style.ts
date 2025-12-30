import styled, { keyframes } from "styled-components";
import tw from "twin.macro";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledContainer = styled.div`
  ${tw`flex flex-col items-center w-full min-h-screen bg-zinc-950 px-4 md:px-8 `}
`;

export const StyledBox = styled.div`
  ${tw`w-full max-w-5xl flex flex-col`}

  @media(max-width: 630px){
    ${tw`mb-20`}
  }
`;

export const StyledTabs = styled.div`
  ${tw`
    flex w-full sticky top-[64px] sm:top-[82px] 
    bg-zinc-950/80 backdrop-blur-md z-30
    border-b border-zinc-800
  `}
  z-index: 10;
  
  p {
    ${tw`
      flex-1 text-center py-4 text-sm md:text-base font-bold
      transition-all duration-200 cursor-pointer text-zinc-100
      relative
    `}

    &:hover {
      ${tw`text-zinc-300`}
    }

    &.active {
      ${tw`text-red-500`}
      &::after {
        content: '';
        ${tw`absolute bottom-0 left-0 w-full h-[3px] bg-red-600 shadow-sm`}
        box-shadow: 0 -2px 10px rgba(220, 38, 38, 0.5);
      }
    }
  }
`;

export const StyledContents = styled.div`
  ${tw`w-full py-6 min-h-[500px]`}
  
  animation: ${fadeIn} 0.4s ease-out;
`;