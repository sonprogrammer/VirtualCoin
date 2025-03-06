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
    @media(min-width: 900px){
        ${tw`
            px-24
        `}
    }

    @media(max-width: 630px){
        margin-bottom: 60px;
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
        // border-separate
        `}
            // border-collapse: collapse;

    th{
        ${tw`
            p-2
            w-full
        `}
        @media(max-width: 570px){
            padding: 5px;
        }
    }
`

export const StyledTableHead = styled.thead`
    ${tw`
        bg-gray-200
    `}
`

export const StyledTableBody = styled.tbody`

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
        w-full
        justify-center
        mt-4
        pb-5
        gap-3
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