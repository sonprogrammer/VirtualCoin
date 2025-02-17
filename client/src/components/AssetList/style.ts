import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
        w-full
    `}
`
export const StyledTable = styled.table`
    ${tw`
        w-full
        table-fixed
        // border-collapse
    `}
`
export const StyledTableHead = styled.thead`
    ${tw`
        bg-gray-200
    `}
    th{
        padding: 4px;
    }
`
export const StyledTableBody = styled.tbody`
    ${tw`

    `}
    td{
        text-align: center;
        padding: 10px 8px;
    }
`
export const StyledTableTr = styled.tr`
    ${tw`
        border-b-2
    `}
`
export const StyledImage = styled.div`
    ${tw`
        flex
        gap-1
    `}
    img{
        width: 24px;
    }
    
`