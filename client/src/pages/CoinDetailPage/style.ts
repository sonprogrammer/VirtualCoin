import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        flex 
        flex-col 
        w-full 
        h-full 
        gap-6 /* 컴포넌트 간 간격 확대 */
        p-5 
        bg-zinc-950
        overflow-y-auto
    `}
    
    /* 데스크탑에서 너무 퍼지지 않게 최대 너비 설정 */
    @media(min-width: 1024px){
        ${tw`px-32 max-w-[1200px] mx-auto`}
    }

    @media(max-width: 630px){
        ${tw`p-3 gap-4`}
        margin-bottom: 70px;
    }
`

export const StyledChart = styled.div`
    ${tw`
        w-full
        bg-zinc-900/40
        rounded-2xl
        border border-zinc-900
        p-4
    `}
`

export const StyledOrderBookAndTrade = styled.div`
    ${tw`
        flex 
        gap-6
        justify-center
        items-start
    `}
    @media(max-width: 730px){
        ${tw`gap-3`}
    }
    @media(max-width: 630px){
        ${tw`flex-col gap-4`} /* 모바일에서는 호가창과 거래창도 세로로 */
    }
`

export const StyledOrderBook = styled.div`
    ${tw`
        w-[55%]
        bg-zinc-900/20
        rounded-2xl
        border border-zinc-900
        overflow-hidden
    `}
    @media(max-width: 630px){
        ${tw`w-full`}
    }
`

export const StyledTrade = styled.div`
    ${tw`
        w-[45%]
        bg-zinc-950
        sticky top-5 /* 스크롤 시 거래창이 따라오게 설정 */
    `}
    @media(max-width: 630px){
        ${tw`w-full static`}
    }
`