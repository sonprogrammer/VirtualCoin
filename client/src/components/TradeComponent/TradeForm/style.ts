import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        p-10
        flex
        flex-col
        gap-3
    `}
`
export const StyledAsset = styled.div`
    ${tw`
        flex
        justify-between
        items-center
        mb-3
    `}
`

export const StyledCoinPrice = styled.div`
    ${tw`
        text-start
        flex
        flex-col
    `}
    
`

export const StyledTradeInput = styled.div`
    ${tw`
        mt-2
        flex
        w-full
    `}
    button{
        border: 1px solid black;
        padding: 0 12px;
        cursor: pointer;
        border-radius: 10px;
        background-color: gray;
        &:hover{
            background-color: lightgray;
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
`


export const StyledCoinAmount = styled.div`
    ${`
        flex
        flex-col
    `}
    
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
    }
`


export const StyledTotalOrder = styled.div`
    ${tw`
        flex
        justify-between
    `}
`

export const StyledBtns = styled.div`
    ${tw`
        flex
        gap-2
        font-bold
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
`

export const StyledBookContainer = styled.div`
    ${tw`
        p-10
        relative
        h-full
    `}
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
`

export const StyledBookInput = styled.div`
    ${tw`
        p-2
    `}
`

export const StyledContent = styled.div`
    ${tw`
        flex    
        flex-col
        flex-1
        ml-4
    `}
`


export const StyledDivider = styled.div`
    ${tw`
        h-[90%]
        overflow-y-auto
    `}
`


export const StyledBookBoxTitle = styled.div`
    ${tw`
        flex
        gap-3
    `}
    
`

export const StyledAmount = styled.div`
    ${tw`
        flex
    `}
`

export const StyledCancleBtn = styled.div`
    ${tw`
        px-3
        py-2
        bg-black
        text-white
        rounded-xl
        cursor-pointer
    `}
`


export const StyledAllCancleBtn = styled.div`
    ${tw`
        bg-gray-500
        rounded-lg
        py-3
        text-white
        cursor-pointer
        mt-8
    `}

    &:hover{
        background-color:rgb(107, 114, 128, 0.9)
    }
`