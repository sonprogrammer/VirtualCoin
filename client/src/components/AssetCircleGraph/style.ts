import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
        w-full 
        relative 
        flex
        py-1
    `}
    position: relative;
    z-index: 0;
`



export const StyledText = styled.div`
    ${tw`
        text-center
        absolute
        top-1/2
        left-1/2
         transform
        translate-x-10
        -translate-y-1/2
        font-bold
    `}

`