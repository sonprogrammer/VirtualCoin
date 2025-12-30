import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
  ${tw`w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950`}
`;

export const StyledTable = styled.table`
  ${tw`w-full table-fixed border-collapse`}
`;

export const StyledTableHead = styled.thead`
  ${tw`bg-zinc-900/80 border-b border-zinc-800`}
  th {
    ${tw`p-4 text-xs font-bold text-zinc-400 text-center uppercase tracking-wider`}
  }
`;

export const StyledTableBody = styled.tbody`
  tr {
    ${tw`border-b border-zinc-900 transition-colors hover:bg-zinc-900/40`}
  }
  td {
    ${tw`p-4 text-sm text-center text-zinc-100 font-medium`}
    vertical-align: middle;
  }
`;

export const StyledTableTr = styled.tr`

`;

export const StyledImage = styled.div`
  ${tw`flex items-center gap-3 justify-start pl-2`}
  img {
    ${tw`w-6 h-6 rounded-full bg-white p-0.5`}
  }
  p {
    ${tw`font-bold text-zinc-100 m-0`}
  }
`;


export const ProfitBox = styled.div`
  ${tw`flex flex-col items-center gap-0.5`}
  p {
    ${tw`text-xs font-bold`}
    &:last-child {
      ${tw`text-[10px] font-medium opacity-80`}
    }
  }
`;


export const StyledTbContainer = styled.div`
    ${tw`
        w-full
        flex
        flex-col
        bg-zinc-950
        pb-20 
    `}
`;

export const StyledNonCoins = styled.div`
    ${tw`
        flex justify-center items-center py-20
        text-zinc-500 font-bold
    `}
`;

export const StyledTbBox = styled.div`
    ${tw`
        w-full
        border-b border-zinc-900 
        bg-zinc-900/20
        mb-2
    `}
`;

export const StyledTbTitle = styled.div`
    ${tw`
        flex
        p-4
        items-center
        gap-4
    `}
`;

export const StyledTbTitleCoinName = styled.div`
    ${tw`
        flex flex-col
        flex-shrink-0
    `}
    p:first-child {
        ${tw`text-zinc-100 font-bold text-base`}
    }
    p:last-child {
        ${tw`text-zinc-500 text-xs font-medium`}
    }
`;

export const StyledTbTitleContents = styled.div`
    ${tw`
        flex-1
        flex flex-col gap-1
    `}
    p {
        ${tw`
            flex
            justify-between
            text-sm
        `}
        span:first-child {
            ${tw`text-zinc-500`}
        }
    }
`;

export const StyledDivider = styled.div`
    ${tw`
        border-t border-zinc-800/50
        w-[92%]
        mx-auto
    `}
`;

export const StyledTbContent = styled.div`
    ${tw`
        flex
        flex-wrap
        p-2
    `}
`;

export const StyledTbContentSmBox = styled.div`
    ${tw`
        flex
        p-3
        flex-col
        items-end
    `}
    flex: 1 1 50%; 

    p:first-child {
        ${tw`text-zinc-200 font-bold text-sm`}
        span:last-child {
            ${tw`text-[10px] text-zinc-500 ml-1 font-normal`}
        }
    }
    p:last-child {
        ${tw`text-zinc-500 text-[11px] mt-1`}
    }
`;