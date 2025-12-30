import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
  ${tw`
    fixed inset-0 z-50
    flex items-center justify-center
    bg-black/80 backdrop-blur-sm
  `}
`;

export const StyledModalBox = styled.div`
  ${tw`
    bg-zinc-900 border border-zinc-800
    p-8 rounded-3xl relative
    max-w-[400px] w-[90%]
    shadow-2xl shadow-red-900/10
  `}
  
  h1 {
    ${tw`
      text-2xl font-black text-center pb-4
      text-white border-b border-zinc-800
    `}
  }
`;

export const StyledModalContent = styled.div`
  ${tw`mt-6 flex flex-col items-center gap-4`}
  
  h2 {
    ${tw`
      text-zinc-400 text-center leading-relaxed
      text-sm md:text-base break-keep
    `}
    span {
      ${tw`text-red-500 font-bold`} 
    }
  }
`;

export const StyledImage = styled.div`
  ${tw`
    w-20 h-20 bg-red-500/10 rounded-full 
    flex items-center justify-center mb-2
  `}
  img {
    ${tw`w-12 h-12 object-contain animate-pulse`}
  }
`;

export const StyledBtn = styled.button`
  ${tw`
    w-full bg-red-600 hover:bg-red-700
    py-4 px-3 text-center text-white
    mt-8 rounded-2xl font-bold
    transition-all duration-200
    disabled:bg-zinc-700 disabled:cursor-not-allowed
  `}
`;

export const StyledCloseBtn = styled.button`
  ${tw`
    absolute top-6 right-6
    text-zinc-500 hover:text-white
    transition-colors
  `}
`;