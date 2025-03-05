import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
        flex 
        flex-col 
        w-full 
        h-full 
        gap-3 
        p-5 
        overflow-y-auto
    `}
    @media(max-width: 630px){
        ${tw`
            p-0
        `}
        margin-bottom: 60px;
    }
`

export const StyledCoinTitle = styled.div`
    ${tw`

        `}
`

export const StyledChart = styled.div`
    ${tw`
        w-full
        `}
`

export const StyledOrderBookAndTrade = styled.div`
    ${tw`
        flex 
        gap-10
        justify-center
        max-h-[700px]
    `}
    @media(max-width: 730px){
        ${tw`
            gap-3
        `}
    }
    @media(max-width: 630px){
        ${tw`
            gap-1
        `}
    }
    
`

export const StyledOrderBook = styled.div`
    ${tw`
        w-[50%]
        `}
`

export const StyledTrade = styled.div`
    ${tw`
        w-[45%]
    `}
`