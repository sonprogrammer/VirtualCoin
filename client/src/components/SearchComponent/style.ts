import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/70 backdrop-blur-sm /* 배경 흐림 효과 */
    `}
`;

export const StyledBox = styled.div`
    ${tw`
        w-[90%] max-w-[600px] h-[650px]
        bg-zinc-900 border border-zinc-800
        rounded-3xl flex flex-col
        overflow-hidden shadow-2xl
    `}
`;

export const StyledInput = styled.div`
    ${tw`
        w-full p-6 flex items-center gap-3
        sticky top-0 bg-zinc-900/90 backdrop-blur-md
        border-b border-zinc-800 z-10
    `}
    input {
        ${tw`
            flex-1 bg-zinc-800 border border-zinc-700
            text-white p-3 px-5 rounded-2xl
            outline-none focus:border-red-500/50 transition-all
        `}
        &::placeholder { ${tw`text-zinc-500`} }
    }
`;

export const StyledCloseBtn = styled.div`
    ${tw`
        w-10 h-10 flex items-center justify-center
        text-zinc-400 hover:text-white hover:bg-zinc-800
        rounded-full transition-all cursor-pointer font-bold
    `}
`;

export const StyledCoinContainer = styled.div`
    ${tw`flex-1 overflow-y-auto p-6 pt-2`}
    h1 {
        ${tw`flex items-center gap-2 mb-6 text-zinc-100 font-bold text-lg`}
        span:last-child { ${tw`text-xs text-zinc-500 font-normal`} }
    }

    /* 스크롤바 커스텀 */
    &::-webkit-scrollbar { width: 5px; }
    &::-webkit-scrollbar-thumb { ${tw`bg-zinc-800 rounded-full`} }
`;

export const StyledCoinBox = styled.div`
    ${tw`
        flex items-center justify-between
        py-4 px-4 border-b border-zinc-900
        cursor-pointer transition-all rounded-2xl
    `}
    &:hover { ${tw`bg-zinc-800/50 border-transparent`} }
`;

export const StyledCoinNumber = styled.div`
    ${tw`text-zinc-600 font-mono text-sm w-6`}
`;

export const StyledCoinNameAndImg = styled.div`
    ${tw`flex items-center gap-3`}
    img { ${tw`rounded-full bg-zinc-800`} }
    ${tw`text-zinc-200 font-medium`}
`;

export const StyledCoinContent = styled.div`
    ${tw`flex flex-col items-end gap-1`}
    p:first-child { ${tw`text-zinc-100 font-bold font-mono text-sm`} }
    p:last-child { ${tw`text-xs font-medium font-mono`} }
`;

export const StyledNoResult = styled.div`
    ${tw`py-20 text-center text-zinc-600 flex flex-col items-center gap-2`}
    &::before { content: "🔍"; font-size: 2rem; }
`;