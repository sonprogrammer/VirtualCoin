import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
        flex
        justify-center
        items-center
        z-10 
        inset-0 
        fixed 
        
    `}
    backdrop-filter: blur(10px);

`

export const StyledBox = styled.div`
    ${tw`
        border-2
        w-[40%]
        h-[400px]
        flex
        flex-col
        rounded-xl
        bg-white
        `}

    h1{
        ${tw`
            text-center
            text-2xl
            font-bold
            py-2
            mt-5
        `}
    }
`

export const StyledPassword = styled.div`
    ${tw`
        flex
        w-full
        justify-center
        ml-4
        gap-3
        text-2xl
        mt-5
    `}
`

export const StyledPasswordSlot = styled.div`
    ${tw`
        w-[40px]
        h-[40px]
        font-bold
    `}

`

export const StyledKeyPad = styled.div`
    ${tw`
        text-center
        font-bold
        grid
        grid-cols-3
        mt-5
        flex
        mt-auto
    `}
`

export const StyledBtns = styled.div`
    ${tw`
        p-3
        text-xl
        bg-red-500
        border-[1px]
        border-red-900
        // rounded-xl
        cursor-pointer
    `}
    transition: background-color 0.2s;

    &:hover{
        ${tw`
            bg-red-300
        `}
    }
`


export const StyledClear = styled.div`
    ${tw`
        p-3
        bg-white
        text-xl
        cursor-pointer
    `}
    &:hover {
        ${tw`
            bg-gray-200
        `}
  }
`

export const StyledSubmit = styled.div`
    ${tw`
        p-3
        bg-white
        cursor-pointer
        text-xl
    `}
    &:hover {
        ${tw`
            bg-gray-200
        `}
  }
`