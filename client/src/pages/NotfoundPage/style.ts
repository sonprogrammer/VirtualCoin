import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
  ${tw`
    flex flex-col justify-center items-center 
    h-[80vh] w-full text-center px-4
  `}
`;

export const ErrorCode = styled.h1`
  ${tw`
    text-[120px] md:text-[200px] font-black 
    text-zinc-900 leading-none select-none
    relative
  `}
  &::after {
    content: '404';
    ${tw`
        absolute inset-0 text-red-600/20 
        animate-pulse blur-sm
    `}
  }
`;

export const MessageWrapper = styled.div`
  ${tw`flex flex-col items-center gap-4 -mt-8 md:-mt-12 z-10`}
  
  h2 {
    ${tw`text-2xl md:text-4xl font-bold text-white`}
  }
  
  p {
    ${tw`text-zinc-500 text-sm md:text-base max-w-xs break-keep`}
  }
`;

export const HomeButton = styled.button`
  ${tw`
    mt-8 px-8 py-3 bg-red-600 text-white font-bold rounded-full
    hover:bg-red-700 transition-all shadow-lg shadow-red-900/40
    active:scale-95
  `}
`;