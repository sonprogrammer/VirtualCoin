import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
        fixed
        inset-0
        bg-black
        bg-opacity-50
        z-50
        flex
        justify-center
        items-center
    `}
`

export const StyledModal = styled.div`
    ${tw`
        bg-white
        rounded-xl
        w-[50%]
        p-5
        flex
        flex-col
        items-center
        justify-center
        max-h-[50%]
        overflow-auto
    `}
    @media(max-width: 730px){
        width: 80%;
    }
    @media(max-width: 630px){
        width: 90%;
    }
`

export const StyledContentTitle = styled.div`
    ${tw`
        flex
        w-full
        justify-between
        border-b-2
    `}
`

export const StyledContent = styled.div`
    ${tw`
        flex
        flex-col
        items-center
        w-full

    `}
`

export const StyledCoin = styled.div`
    ${tw`
        flex
        justify-between
        w-full
        py-1
    `}
`