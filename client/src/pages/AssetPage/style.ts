import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        flex
        flex-1
        flex-col
        justify-center
        items-center
        w-full
        p-5
    `}
    @media(max-width: 450px){
        padding: 0;
    }
`

export const StyledBox = styled.div`
    ${tw`
        flex
        flex-col
        items-center
        //!border는 삭제
        border 
        w-full
    `}
    @media(max-width: 630px){
        margin-bottom: 60px;
    }
    @media(max-width: 570px){
        // padding: 0;
    }
`

export const StyledTabs = styled.div`
    ${tw`
        flex
        w-full
        justify-around
        mt-5
        border-solid
    `}
    p{
        flex:1;
        text-align: center;
        font-weight: bold;
        cursor: pointer;
        padding-bottom: 4px;
    }
`

export const StyledContents = styled.div`
    ${tw`
        w-full
        h-full
    `}
`
