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
    @media(max-width: 530px){
        ${tw`
            text-sm
            px-0
        `}
    }
    @media(max-width: 430px){
        ${tw`
            text-xs
        `}
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
    h1{
        font-size: 20px;
        font-weight: bold;
    }
    p{
        font-size: 12px;
        color: gray;
    }
`

export const StyledBox = styled.div`
    ${tw`

    `}
    @media(max-width:530px){
        padding-bottom: 60px;
    }
`


export const StyledTable = styled.table`
    ${tw`
        border-2
        w-full    
        table-fixed
        border-separate 
        border-2
         rounded-lg
    `}
        border-collapse: collapse;

        th{
        ${tw`
            p-2
            bg-gray-200
        `}
        @media(max-width: 570px){
            // padding: 5px;
        }
    }
`
export const StyledTableHead = styled.thead`

th {
    ${tw`
        p-2
        bg-gray-200
        text-center
    `}
   
}
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
        text-align: center;
     
        @media(max-width: 550px){
            ${tw`
                p-2
            `}
    }
    }
`

export const StyledBtns = styled.div`
    ${tw`
        flex
        w-full
        justify-center
        gap-10
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
                flex
                justify-center
                items-center
            `}
        }
    }
`