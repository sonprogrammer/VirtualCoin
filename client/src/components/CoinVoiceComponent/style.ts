import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
        flex
        flex-col
        w-full
        border-2
        p-2
        gap-2
    `}
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
            justify-content: end;
            align-items: center;
        }
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
            justify-content: end;
            align-items: center;
        }
    }
`

export const QuantityBar = styled.div<{ quantity: number; totalQuantity: number; type: "ask" | "bid"; }>`
  ${tw`
    absolute
    h-3
    right-0
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