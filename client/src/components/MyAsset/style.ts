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
  ${tw`h-full flex flex-col gap-8`}
`;

export const StyledTotalAsset = styled.div`
  ${tw`
    flex w-full bg-zinc-900/40 rounded-3xl border border-zinc-800 
    overflow-hidden backdrop-blur-sm
  `}
`;

// 텍스트 정보 영역 (왼쪽)
export const InfoSection = styled.div<{ showGraph: boolean }>`
  ${props => props.showGraph ? tw`w-[60%] border-r border-zinc-800` : tw`w-full`}
  ${tw`transition-all duration-300`}
`;

// 그래프 영역 (오른쪽)
export const GraphSection = styled.div`
  ${tw`w-[40%] flex items-center justify-center p-6`}
`;

export const StyledAssetGraph = styled.div`
  ${tw`flex w-full justify-center py-8 bg-zinc-900/60`}
  animation: ${fadeIn} 0.4s ease-out;
`;

export const StyledAssetGraphToggle = styled.div`
  ${tw`
    p-4 px-6 border-t border-zinc-800
    justify-between w-full flex items-center
    cursor-pointer transition-colors
    text-zinc-400 font-bold
  `}
  
  &:hover {
    ${tw`bg-zinc-800 text-white`}
  }

  span:last-child {
    ${tw`text-red-500`}
  }
`;

export const ListTitle = styled.div`
  ${tw`
    border-t border-zinc-800 py-6 px-4
    text-lg font-black text-white
    flex items-center gap-2
  `}
  &::before {
    content: '';
    ${tw`w-1 h-5 bg-red-600 rounded-full`}
  }
`;