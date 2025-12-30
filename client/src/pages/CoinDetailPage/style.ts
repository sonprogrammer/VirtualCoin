import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        flex 
        flex-col 
        w-full 
        h-full 
        gap-6
        p-5 
        bg-zinc-950
        overflow-y-auto
    `}
    
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
        ${tw`flex-col gap-4`} 
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
        sticky top-5 
    `}
    @media(max-width: 630px){
        ${tw`w-full static`}
    }
`