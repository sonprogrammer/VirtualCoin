import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
        w-full
        h-full
    `}
`
export const StyledTop = styled.div`
    ${tw`
        w-full
        p-2
        flex
        justify-end
        border-b-2
    `}
    p{
        padding: 0 10px;
        cursor: pointer;
    }
`

export const StyledTable = styled.table`
    ${tw`
        w-full
    `}
    @media(max-width: 750px){
        ${tw`
            text-sm    
        `}
    }
    @media(max-width:630px){
        ${tw`
            text-xs
        `}
    }
`
export const StyledTableHead = styled.thead`
    ${tw`
        border-b-2
    `}
    th{
        padding: 8px 0;
    }
`

export const StyledTableBody = styled.tbody`
    ${tw`

    `}
    td{
        ${tw`
            text-center
            py-2
        `}
        
    }
    tr{
        ${tw`
            border-b-2
            cursor-pointer
        `}
        &:last-child{
            border: none;
        }
        &:hover{
            ${tw`
                bg-gray-100    
            `}
        }
    }
`
