import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
        flex
        w-full
        justify-between
        py-4
        border-b-2
    `}
`
export const StyledCLogoImg = styled.div`
    ${tw`
        flex
        items-center
        gap-3
        pl-3
    `}
    img{
        ${tw`
            w-[48px]
        `}
    }
    p{
        ${tw`
            text-xl
            font-bold
        `}
    }
`

export const StyledCoinInfo = styled.div`
    ${tw`
        flex
        text-sm
        gap-3
    `}
`

export const StyledPrices = styled.div`
    ${tw`
        flex
        flex-col
    `}
    p{
        ${tw`
            flex
            justify-between
            gap-5
            p-1
            `}
        &:first-child{
            ${tw`
                border-b-2
            `}
        }
            
    }
`
export const StyledRates = styled.div`
    ${tw`
        flex
        flex-col

    `}
    
    div{
        ${tw`
            flex
            p-1
            justify-between
            items-center
            gap-5
            `}
        
        &:first-child{
        ${tw`
            border-b-2
        `}
    }
    }
`

export const StyledRateNumbers = styled.p`
    ${tw`
        flex
        gap-1
        items-center
    `}
    span:last-child{
        ${tw`
            text-xs
            text-gray-500
        `}
    }
`