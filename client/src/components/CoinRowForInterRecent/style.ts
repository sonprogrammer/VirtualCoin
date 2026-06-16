import styled from "styled-components";
import tw from "twin.macro";

export const StyledCoin = styled.div`
    ${tw`
        flex
        justify-between
        items-center
        w-full
        cursor-pointer
        py-2
        mb-2 
        border border-slate-700
        rounded-lg 
        transition-colors
        `}
        p{
            ${tw`
                flex
                justify-center
                flex-1
                py-2
            `}
        }
            &:hover{
                    ${tw`
                        bg-slate-700
                    `}
                }
`