import styled from "styled-components";
import tw from "twin.macro";


export const Styledcontainer = styled.div`
    ${tw`
        w-full
        h-full
        bg-gray-300
        rounded-2xl
        flex
        flex-col
    `}
`

export const StyledNavbar = styled.div`
    ${tw`
        flex
        justify-around
    `}
        p{
            border-radius: 10px;
            cursor:pointer;  
            flex: 1;
            padding: 10px 0;  
            &:hover{
                background-color: rgba(125, 125, 125, 0.5);
            }
            text-align: center;
        }
    @media(max-width: 630px){
        p{
            ${tw`
                text-sm
                `}
        }
    }
`
export const StyledTradeSection = styled.div`
    ${tw`
        flex-1
        overflow-y-auto
    `}
`
