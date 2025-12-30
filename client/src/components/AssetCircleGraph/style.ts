import styled from "styled-components";
import tw from "twin.macro";

export const GraphWrapper = styled.div`
  ${tw`flex items-center justify-center w-full h-[250px] relative`}
`;

export const ChartSide = styled.div`
  ${tw`relative w-[200px] h-[200px] flex-shrink-0`} 
`;

export const LegendSide = styled.div`
  ${tw`flex flex-col gap-2 ml-4 overflow-y-auto max-h-[200px] pr-2`}

`;

export const LegendItem = styled.div`
  ${tw`flex items-center gap-2 text-[11px] text-zinc-400`}
  .dot { ${tw`w-2 h-2 rounded-full`} }
  .name { ${tw`text-zinc-200 font-bold w-12`} }
`;

export const StyledText = styled.div`
  ${tw`absolute top-1/2 left-1/2 pointer-events-none flex flex-col items-center`}
  transform: translate(-50%, -50%);
  p:first-child { ${tw`text-zinc-500 text-[10px] m-0`} }
  p:last-child { ${tw`text-white text-[13px] font-black m-0`} }
`;