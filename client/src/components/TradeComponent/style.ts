import styled from "styled-components";
import tw from "twin.macro";


export const Styledcontainer = styled.div`
    ${tw`
        w-[50%]
        h-full
        bg-gray-300
        rounded-2xl
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
        }
    
`
export const StyledTradeSection = styled.div`
    ${tw`
        flex-1
    `}
`

export const StyledButtons = styled.div`
    ${tw`

    `}
`