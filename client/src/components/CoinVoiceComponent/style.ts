import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
        flex
        flex-col
        h-full
        w-full
        border-2
        p-2
        gap-2
        overflow-y-auto
    `}
    
    @media(max-width: 500px){
        ${tw`
            p-0
        `}
    }
`
export const StyledAskBox = styled.div`
    ${tw`
        text-blue-700
        bg-blue-100/50
    `}
`
export const StyledAskContent = styled.div`
    ${tw`
        flex
        justify-around
        w-full
    `}
    p{
        ${tw`
            flex-1
            text-center
            px-2
        `}
        &:first-child{
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }


    }

    @media(max-width:630px){
        
        p{
            &:first-child{
                ${tw`
                    flex
                    justify-start
                `}
            }
        }
    }
    
    @media(max-width: 600px){
        ${tw`
            text-sm
        `}
    }
    @media(max-width: 500px){
        ${tw`
            text-xs
        `}

    }
`
export const StyledRight = styled.div`
    ${tw`
        flex
        flex-auto
    `}

    p:first-child{
        ${tw`
            font-bold
        `}
    }
        @media(max-width: 630px){
            ${tw`
                flex-col
                items-end
            `}
        }
`

export const StyledBidBox = styled.div`
    ${tw`
        text-red-500
        bg-red-100/50
    `}
`
export const StyledBidContent = styled.div`
     ${tw`
        flex
        justify-around
        w-full
    `}
    p{
        ${tw`
            flex-1
            text-center
            px-2
        `}
        &:first-child{
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }


    }

    @media(max-width:630px){
        
        p{
            &:first-child{
                ${tw`
                    flex
                    justify-start
                `}
            }
        }
    }
    
    @media(max-width: 600px){
        ${tw`
            text-sm
        `}
    }
    @media(max-width: 500px){
        ${tw`
            text-xs
        `}
`

export const QuantityBar = styled.div<{ quantity: number; totalQuantity: number; type: "ask" | "bid"; }>`
  ${tw`
    absolute
    h-3
    left-0
    h-[90%]
    rounded
    opacity-30
  `};
  background-color: ${({ type }) => 
    type === 'ask' ? 'blue' : type ==='bid' ? 'red' : 'gray'
    };
  width: ${({ quantity, totalQuantity }) => (totalQuantity > 0 ? `${(quantity / totalQuantity) * 100}%` : "0%")};
  transition: width 0.3s ease-in-out;
`;