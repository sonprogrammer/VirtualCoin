import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
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
    span:last-child{
        ${tw`
            text-sm
            text-gray-400
            ml-2
        `}
    }
`
export const StyledBox = styled.div`
    ${tw`
        w-[90%]
        bg-white
        rounded-xl
        flex
        flex-col
        h-[600px]
        overflow-y-auto
        relative
    `}
    @media(min-width: 900px){
        width: 50%;
    }

`
export const StyledInput = styled.div`
    ${tw`
        w-full
        p-5
        flex
        justify-center
        sticky
        top-0
        bg-white
    `}
    input{
        ${tw`
            border-2
            w-full
            p-2
            rounded-xl
            
        `}
        &:focus{
            ${tw`
                border-red-400    
                outline-none
            `}
        }
    }
`

export const StyledNoResult = styled.div`
    ${tw`
        w-full
        text-center
    `}
`


export const StyledCoinContainer = styled.div`
    ${tw`
        m-5
        mt-0
    `}
    h1{
        ${tw`
            text-xl
            mb-2
            border-b-2
            pl-2
        `}
    }
`

export const StyledCoin = styled.div`
    ${tw`
        flex
        flex-col
    `}
`

export const StyledCoinBox = styled.div`
    ${tw`
        flex
        py-1
        border-b-2
        justify-between
    `}
    &:hover{
        ${tw`
            bg-gray-100
        `}
    }
`
export const StyledCoinNumber = styled.div`
    ${tw`
        p-2
    `}

`

export const StyledCoinNameAndImg = styled.div`
    ${tw`
        flex
        items-center
        gap-2
    `}

`
export const StyledCoinContent = styled.div`
    ${tw`
        flex
        flex-col
    `}
    p{
        ${tw`
            text-sm
            text-right
        `}
    }

`