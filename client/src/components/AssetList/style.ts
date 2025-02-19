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

export const StyledTbContainer = styled.div`
    ${tw`
        w-full
        flex
        flex-col
    `}
`
export const StyledTbBox = styled.div`
    ${tw`
        w-full
        border-t-2
        border-gray-300
    `}
`
export const StyledTbTitle = styled.div`
    ${tw`
        flex
        p-2
        items-center
    `}
`

export const StyledTbTitleCoinName = styled.div`
    ${tw`
        flex-1
        font-bold
    `}

`
export const StyledTbTitleContents = styled.div`
    ${tw`
        flex-1
    `}
    p{
        ${tw`
            flex
            justify-between
        `}
    }
         @media(max-width:430px){
        ${tw`
            text-sm
        `}
    }
`

export const StyledDivider = styled.div`
    ${tw`
        border-[1px]
        w-[90%]

    `}
    margin: 0 auto;
`


export const StyledTbContent = styled.div`
    ${tw`
        flex
        flex-wrap
    `}

`

export const StyledTbContentSmBox = styled.div`
    ${tw`
        flex
        p-1
        flex-col
        items-end
    `}
    flex: 1 1 calc(50% - 10px);
    p{
        &:last-child{
            color: gray;
            font-size: 12px;
        }
        span{
            &:last-child{
                font-weight: bold;
            }
        }
    }
         @media(max-width:430px){
        ${tw`
            text-sm
        `}
    }
`