import styled from "styled-components";
import tw from "twin.macro";

export const StyeldContainer = styled.div`
    ${tw`
        flex
        items-center
        justify-center
        bg-gray-800
        fixed
        bg-opacity-50
        inset-0
        z-50
    `}
`

export const StyeldBox = styled.div`
    ${tw`
        w-[50%]
        bg-gray-600
        rounded-xl
        p-5
        flex
        flex-col
        gap-5
    `}
`
export const StyeldTitle = styled.div`
    ${tw`
        text-center
        text-xl
        font-bold
    `}
`
export const StyeldBtns = styled.div`
    ${tw`
        flex
        items-center
        justify-center
    `}
`
export const StyeldYesBtn = styled.div`
    ${tw`
        cursor-pointer
        rounded-xl
    `}
    padding: 10px 20px;
    transition: all 0.3s ease;

    &:hover{
        background-color: red;
        color: white;
    }
`
export const StyeldNoBtn = styled.div`
    ${tw`
        cursor-pointer
    `}
    padding: 10px 20px;
`