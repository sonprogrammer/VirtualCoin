import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
        inset-0
        bg-gray-800
        bg-opacity-50
        z-10
        flex
        items-center
        justify-center
        fixed
    `}
`
export const StyledModalBox = styled.div`
    ${tw`
        bg-white
        p-8
        rounded-xl
        h-[35%]
        relative
    `}
    @media(max-width:390px){
        width: 90%;
    }
    h1 {
        ${tw`
            text-2xl
            font-bold
            text-center
            pb-2
            border-gray-800
            border-b-2
        `}
    }
`


export const StyledModalContent = styled.div`
    ${tw`
        mt-3
    `}
    
`

export const StyledImage = styled.div`
    ${tw`
        flex
        justify-center
    `}
`

export const StyledBtn = styled.div`
    ${tw`
        bg-red-500
        py-2
        px-3
        text-center
        text-white
        mt-3
        rounded-xl
        cursor-pointer
    `}
`