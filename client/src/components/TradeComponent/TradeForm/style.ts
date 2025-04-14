import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        p-4
        flex
        flex-col
        gap-3
    `}
    @media(max-width: 450px){
        ${tw`
            p-2
        `}
    }
`
export const StyledAsset = styled.div`
    ${tw`
        flex
        justify-between
        items-center
        mb-3
    `}
    @media(max-width: 630px){
            p{
                ${tw`
                    text-sm
                `}
            }
    }
`

export const StyledCoinPrice = styled.div`
    ${tw`
        text-start
        flex
        flex-col
    `}
    @media(max-width: 630px){
        p{
            ${tw`
                text-sm
            `}
        }
    }
    
`

export const StyledTradeInput = styled.div`
    ${tw`
        mt-2
        flex
        w-full
        gap-1
    `}
    button{
        border: 1px solid black;
        padding: 0 12px;
        cursor: pointer;
        border-radius: 50%;
        ${tw`
            bg-gray-500
        `}
        &:hover{
            ${tw`
                bg-gray-400
            `}
        }
       
    }

    input{
        ${tw`
            w-full
            font-bold 
            text-black
            outline-none
            p-2
            rounded-xl
        `}
        &:focus{
            border: 1px solid black;
        }
        &::placeholder{
            color: black;
        }
    }
    @media(max-width: 630px){
        input{
            ${tw`
                text-sm
            `}
        }
        button{
            padding: 0 10px;
        }
    }
`


export const StyledCoinAmount = styled.div`
    ${`
        flex
        flex-col
    `}
    @media(max-width: 630px){
        
    }
`


export const StyledAmountInput = styled.div`
    ${tw`
        flex
        flex-col
        text-start
        mt-3
    `}
    input{
        ${tw`
            mt-2
            p-2
            w-full
            font-bold
            text-black
            outline-none
            rounded-xl
        `}
        &:focus{
            border: 1px solid red;
        }
    }
    @media(max-width: 630px){
        input{
            ${tw`
                text-sm
                `}
        }
        p{
            ${tw`
                text-sm
            `}
        }
    }
`

export const StyledAmountRate = styled.div`
    ${tw`
        flex
        justify-around
        mt-2
    `}
    button{
        ${tw`
            border-gray-700
            border-[1px]
            rounded-lg
            px-2
        `}
        &:hover{
            ${tw`
                bg-gray-200
                `}
        }
    }
    @media(max-width: 570px){
        button{
            ${tw`
                text-xs
                py-1
                px-1
            `}
        }
    }
`


export const StyledTotalOrder = styled.div`
    ${tw`
        flex
        justify-between
    `}
    @media(max-width: 630px){
        p{
            ${tw`
                text-sm
                `}
        }
    }
    @media(max-width: 490px){
        p{
            ${tw`
                text-xs
            `}
        }
    }
`

export const StyledBtns = styled.div`
    ${tw`
        flex
        gap-2
        font-bold
        pb-0
    `}
    button:first-child{
        width: 30%;
        background-color: gray;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        color: white;
        padding: 5px 0;
    }

    button:last-child{
        width: 70%;
        border-radius: 8px;
        color: white;
    }
        @media(max-width: 630px){
            button{
                span{
                    display:none;
                }
            }
        }
`

export const StyledBookContainer = styled.div`
    ${tw`
        p-5
        h-full
    `}
    @media(max-width: 630px){
        ${tw`
            p-2
        `}
    }
`

export const StyledBookTitle = styled.div`
    ${tw`
        flex
        w-full
        justify-around
        border-2
        rounded-xl
    `}
    button{
        flex: 1;
        padding: 8px 0;
        border-radius: 12px;
    }
    @media(max-width: 630px){
        button{
            ${tw`
                text-sm
                `}
        }
    }
`


export const StyledBookContents = styled.div`
    ${tw`
        flex
        flex-col
        gap-2
        mt-2
    `}
`
export const StyledBookBox = styled.div`
    ${tw`
        flex
        items-center
        justify-around
        border-2
        py-2
        px-3
        w-full
    `}
    @media(max-width: 490px){
        ${tw`
            px-1
        `}
    }
`
export const StyledContent = styled.div`
    ${tw`
        flex    
        flex-col
        flex-1
        ml-4
    `}
    @media(max-width: 630px){
        ${tw`
            ml-2
        `}
    }
`


export const StyledDivider = styled.div`
    ${tw`
        max-h-[70%]
        overflow-y-auto
    `}
`


export const StyledBookBoxTitle = styled.div`
    ${tw`
        flex
        gap-3
    `}
    @media(max-width: 630px){
        p,h1{
            ${tw`
                text-sm
            `}
        }
    }
    @media(max-width: 490px){
        p,h1{
            ${tw`
            gap-1
            text-[9px]
        `}
        }
    }
`

export const StyledAmount = styled.div`
    ${tw`
        flex
        text-xs
    `}
    @media(max-width: 760px){
        ${tw`
            flex-col
        `}
    }
    @media(max-width: 630px){
        p{
            font-size: 10px;
        }
    }
    @media(max-width: 490px){
        p:last-child{
            display: flex;
            flex-direction: column;
        }
    }
`

export const StyledCancleBtn = styled.div`
    ${tw`
        px-3
        py-2
        bg-gray-950
        text-white
        rounded-xl
        cursor-pointer
    `}
        &:hover{
            ${tw`
                bg-gray-700
            `}
        }
    @media(max-width: 760px){
        ${tw`
            text-xs
            px-2
            py-1
        `}
    }
`

export const StyledDate = styled.div`
    ${tw`
        flex
        flex-col
    `}
    h1{
        ${tw`
            font-bold
            text-center
        `}
        @media(max-width: 490px){
            font-size: 10px;
        }
    }
    p{
        ${tw`
            text-[12px]    
        `}
    }
`


export const StyledAllCancleBtn = styled.div`
    ${tw`
        flex
        gap-2
        font-bold
        mt-5
        mb-5
    `}
    button:first-child{
        width: 30%;
        background-color: gray;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        color: white;
        padding: 5px 0;
    }

    button:last-child{
        width: 70%;
        border-radius: 8px;
        color: white;
        ${tw`
            bg-gray-500
        `}
        &:hover{
            background-color:rgb(107, 114, 128, 0.9)
        }
    }
    @media(max-width: 630px){
        span{
            display: none;
        }
    }
`