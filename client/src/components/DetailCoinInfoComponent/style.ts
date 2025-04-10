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
    @media(max-width: 790px){
        ${tw`
            py-1
        `}
    }
    @media(max-width: 630px){
        ${tw`
            p-2
        `}
    }
    @media(max-width: 450px){
        ${tw`
            flex-col
            gap-2
        `}
    }
    
`

export const StyledLeftInfo = styled.div`
    ${tw`
        flex
        gap-5
    `}
    @media(max-width: 790px){
        ${tw`
            flex
            flex-col    
            text-sm
            gap-1
        `}
    }
    @media(max-width: 630px){
        ${tw`
            gap-3    
            justify-center
        `}
    }
    @media(max-width: 450px){
        ${tw`
            flex-row
            items-center
            justify-between
        `}
    }
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
    @media(max-width: 630px){
        p{
            ${tw`
                text-lg
        `}
        }
    }
    
`

export const StyledTitlePrice = styled.div`
    ${tw`
        flex
        flex-col
        items-center
    `}
    p:first-child{
        ${tw`
            flex
            gap-1    
        `}
    }
    @media(max-width: 790px){
        ${tw`
            pl-3
        `}
    }
    @media(max-width: 630px){
        ${tw`
            text-xs
        `}
    }
`

export const StyledConInfoWrapper = styled.div`
    ${tw`

    `}
    @media(max-width: 450px){
        ${tw`
            max-h-[28px]
            overflow-hidden
            border-2
            border-red-100
        `}
        &:hover{
            overflow-y: auto;
        }
    }
`

export const StyledCoinInfo = styled.div`
    ${tw`
        flex
        text-sm
        gap-3
    `}
    @media(max-width: 790px){
        ${tw`
            items-center
        `}
    }
    @media(max-width: 630px){
        ${tw`
            text-xs
            flex-col
            gap-1
        `}
    }
    @media(max-width: 450px){
        ${tw`
            will-change-transform
        `}
        animation: scrolling 10s linear infinite;
        &:hover{
            animation-play-state: paused;
        }            
        @keyframes scrolling{
            0% {
                transform: translateY(0);
            }
  
            100%{
                transform: translateY(-100%);
            }
}
    }
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
        @media(max-width: 630px){
            &:last-child{
                ${tw`
                    border-b-2
                `}
            }
        }
    }
    @media(max-width: 630px){
        ${tw`
            w-full
            flex-1
        `}
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
    @media(max-width: 630px){
        ${tw`
            flex-1
            w-full
        `}
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

export const StyledLikedBtn = styled.div`
    ${tw`
        flex
        items-center
        justify-center
        border-2
        p-1
        rounded-md
        w-[30px]
        h-[30px]
    `}
    
`