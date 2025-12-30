import styled from "styled-components";
import tw from "twin.macro";

export const Styledcontainer = styled.div`
    ${tw`
        w-full
        h-full
        bg-zinc-900/40 /* 다크모드 배경 */
        rounded-2xl
        flex
        flex-col
        border border-zinc-900
        overflow-hidden
    `}
`

export const StyledNavbar = styled.div`
    ${tw`
        flex
        p-1.5
        bg-zinc-900/60
        border-b border-zinc-900
    `}
    p {
        ${tw`
            flex-1
            py-2.5
            text-sm
            font-medium
            text-zinc-500
            cursor-pointer
            text-center
            rounded-xl
            transition-all
            duration-200
        `}
        
        &:hover {
            ${tw`text-zinc-300 bg-zinc-800/50`}
        }
    }

    /* 선택된 탭 전용 클래스 (JS에서 동적으로 할당) */
    .active-buy {
        ${tw`bg-red-600/90 text-white font-bold shadow-lg shadow-red-900/20`}
    }
    .active-sell {
        ${tw`bg-sky-600/90 text-white font-bold shadow-lg shadow-sky-900/20`}
    }
    .active-book {
        ${tw`bg-zinc-700 text-white font-bold`}
    }

    @media(max-width: 630px){
        p { ${tw`text-xs py-2`} }
    }
`

export const StyledTradeSection = styled.div`
    ${tw`
        flex-1
        overflow-y-auto
        p-4 /* 입력 폼과의 여백 */
    `}
    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-thumb { ${tw`bg-zinc-800 rounded-full`} }
`