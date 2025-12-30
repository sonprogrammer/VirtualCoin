import styled from "styled-components";
import tw from "twin.macro";

// --- 공통 컨테이너 ---
export const StyledContainer = styled.div`
    ${tw`p-4 flex flex-col gap-4 bg-zinc-950`}
`;

// --- 매수/매도 폼 전용 (CoinTradeForm) ---
export const StyledAsset = styled.div`
    ${tw`flex justify-between items-center mb-1`}
    p:first-child { ${tw`text-xs text-zinc-500 font-bold`} }
    p:last-child { ${tw`text-sm text-zinc-200`} }
`;

export const StyledCoinPrice = styled.div`
    ${tw`text-start flex flex-col`}
`;

export const StyledTradeInput = styled.div`
    ${tw`mt-2 flex w-full gap-1`}
    input {
        ${tw`
            w-full font-bold text-white outline-none p-3
            bg-zinc-900 border border-zinc-800 rounded-xl
            focus:border-zinc-600 transition-all text-right
        `}
    }
    button {
        ${tw`
            bg-zinc-800 text-zinc-400 w-10 h-10 flex 
            items-center justify-center rounded-xl border border-zinc-700
            hover:bg-zinc-700 hover:text-white transition-all
        `}
    }
`;

export const StyledCoinAmount = styled.div`
    ${tw`flex flex-col`}
`;

export const StyledAmountInput = styled.div`
    ${tw`flex flex-col text-start mt-3`}
    p { ${tw`text-xs text-zinc-500 font-bold mb-2`} }
    input {
        ${tw`
            p-3 w-full font-bold text-white outline-none
            bg-zinc-900 border border-zinc-800 rounded-xl
            focus:border-red-900/30 text-right
        `}
    }
`;

export const StyledAmountRate = styled.div`
    ${tw`flex justify-between mt-3 gap-1`}
    button {
        ${tw`
            flex-1 py-1.5 text-[11px] font-bold
            bg-zinc-900 text-zinc-500 border border-zinc-800
            rounded-lg hover:bg-zinc-800 hover:text-zinc-200 transition-all
        `}
    }
`;

export const StyledTotalOrder = styled.div`
    ${tw`flex justify-between items-center py-4 border-t border-zinc-900 mt-2`}
    p:first-child { ${tw`text-xs text-zinc-500 font-bold`} }
    p:last-child { ${tw`text-lg font-black text-white`} }
`;

export const StyledBtns = styled.div`
    ${tw`flex gap-2 font-bold mt-2`}
    button:first-child {
        ${tw`w-[30%] bg-zinc-800 text-zinc-400 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-zinc-700`}
    }
    button:last-child {
        ${tw`w-[70%] rounded-xl py-3 text-lg shadow-lg active:scale-95 transition-all`}
    }
`;

// --- 예약 내역 폼 전용 (CoinBookForm) ---
export const StyledBookContainer = styled.div`
    ${tw`p-4 h-full flex flex-col gap-4`}
`;

export const StyledBookTitle = styled.div`
  ${tw`flex bg-zinc-900 p-1 rounded-xl border border-zinc-800`}
  button {
    ${tw`flex-1 py-2 text-xs font-bold text-zinc-500 rounded-lg transition-all`}
    &.active-pending { ${tw`bg-sky-600 text-white shadow-md`} }
    &.active-completed { ${tw`bg-red-600 text-white shadow-md`} }
  }
`;

export const StyledDivider = styled.div`
    ${tw`max-h-[70%] overflow-y-auto`}
    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-thumb { ${tw`bg-zinc-800 rounded-full`} }
`;

export const StyledBookContents = styled.div`
    ${tw`flex flex-col gap-2 mt-2`}
`;

export const StyledBookBox = styled.div`
    ${tw`
        flex items-center justify-between py-4 px-4
        bg-zinc-900/40 border border-zinc-900 rounded-xl
        mb-2 transition-all hover:border-zinc-700
    `}
    &.selected { ${tw`bg-zinc-800 border-zinc-600`} }
`;

export const StyledContent = styled.div`
    ${tw`flex flex-col flex-1`}
`;

export const StyledBookBoxTitle = styled.div`
    ${tw`flex gap-3 items-center`}
    p { ${tw`text-zinc-100 font-bold text-sm`} }
`;

export const StyledAmount = styled.div`
    ${tw`flex mt-1`}
    p:first-child { ${tw`text-zinc-400 font-mono text-xs`} }
    p:last-child { ${tw`text-zinc-500 text-xs ml-2`} }
`;

export const StyledCancleBtn = styled.div`
    ${tw`
        px-3 py-1.5 bg-zinc-800 text-zinc-300 
        text-xs font-bold rounded-lg cursor-pointer
        hover:bg-red-900/30 hover:text-red-500 transition-all
    `}
`;

export const StyledDate = styled.div`
    ${tw`flex flex-col items-end`}
    h1 { ${tw`font-bold text-[10px] text-zinc-600 uppercase`} }
    p { ${tw`text-[11px] text-zinc-400 font-mono`} }
`;

export const StyledAllCancleBtn = styled.div`
    ${tw`flex gap-2 font-bold mt-auto mb-4`}
    button:first-child {
        ${tw`w-[30%] bg-zinc-800 text-zinc-400 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-zinc-700`}
    }
    button:last-child {
        ${tw`w-[70%] bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-xl py-3 hover:bg-red-900/40 hover:text-red-500 hover:border-red-900 transition-all`}
    }
`;