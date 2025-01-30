import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        h-full
        text-center
        // text-white
        p-5
        flex
        flex-col
        justify-center
    `}
     background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    url('/mainbg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    
    h1{
        font-size: 2rem;
        font-weight: bold;
        background: linear-gradient(to left, blue, red);
        -webkit-background-clip: text;
        color: transparent;
    }

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