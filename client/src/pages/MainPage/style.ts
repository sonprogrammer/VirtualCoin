import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        h-full
        text-center
        p-5
        flex
        flex-col
        justify-center
    `}

`
export const StyledMoreBtn = styled.div`
        ${tw`
            mt-5
            rounded-xl
            cursor-pointer
            bg-red-700
            block
            mx-auto
            text-white
            `}
            padding: 10px 32px;
`