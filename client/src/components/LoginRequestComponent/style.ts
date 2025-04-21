import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
        inset-0
        fixed
        items-center
        justify-center
        flex
        bg-black/90
        backdrop-blur-sm
    `}
`
export const StyledBox = styled.div`
    ${tw`
        bg-white
        p-6
        rounded-lg
        shadow-lg
        text-center

    `}
    p{
        ${tw`
            border-2
            bg-red-600
            mt-3
            text-white
        `}
    }
`
