import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        h-full
        flex
        flex-col
        w-full
        px-5
        items-center
    `}

    @media(max-width: 630px){
        margin-bottom: 60px;
    }
    @media(max-width: 570px){
        padding: 0;
    }
`

export const StyledTitle = styled.div`
    ${tw`
        flex
        flex-col
        items-start
        w-full
        p-5
    `}
    h2{
        ${tw`
            text-xl
            font-bold    
        `}
    }
    p{
        ${tw`
            text-[12px]
        `}
    }
`

export const StyledTable = styled.table`
    ${tw`
        border-2
        w-full    
        table-fixed
        `}
        border-radius: 20px;
    th{
        ${tw`
            p-2
            w-full
            bg-gray-200
        `}
        @media(max-width: 570px){
            padding: 5px;
        }
    }
`

export const StyledTableHead = styled.thead`
    ${tw`
        border-b-2
        border-black
    `}
    
`

export const StyledTableBody = styled.tbody`
    ${tw`

    `}
    tr{
        ${tw`
            border-b-2
            p-2
        `}
        &:hover{
            ${tw`
                bg-gray-100
            `}
        }
    }
    td{
        padding: 10px 8px;
    }
`

export const StyledPageBtns = styled.div`
    ${tw`
        flex
        w-[50%]
        justify-center
        mt-4
        pb-5
    `}
    button{
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        item-align: center;
        border-radius: 50%;
        &:hover{
            ${tw`
                bg-red-300
                text-white
            `}
        }
    }
`