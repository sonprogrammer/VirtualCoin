import styled from 'styled-components';
import tw from 'twin.macro';


export const StyledContainer = styled.div`
    ${tw`
        w-full
    `}
    @media(max-width: 600px){
        ${tw`
            text-sm    
        `}
    }
`

export const StyledPeriodAndType = styled.div`
    ${tw`
        flex
        px-6
        py-3
        flex-col
        justify-center
        relative
    `}
    h1{
        ${tw`
            bg-gray-500
            p-1
            px-4
            text-white
            cursor-pointer
            `}
            border-radius: 12px;
    }
    @media(max-width: 385px){
        ${tw`
            px-2    
        `}
    }
`


export const StyledDetail = styled.div`
    ${tw`
        flex
        gap-3
         justify-between
        items-center
        pb-1
    `}
    h2{
        cursor: pointer;
        padding: 2px 16px;
        border-radius: 12px;
    }
    
`

export const StyledSelect = styled.div`
    ${tw`
        flex   
        flex-col
    `}
`

export const StyledDate = styled.div`
    ${tw`
        text-xs
        flex
        bg-gray-100
        py-1
        px-3
        gap-3
    `}
`

export const StyledPeriodBurgerMenu = styled.div`
    ${tw`
        flex
        gap-2
        pb-1
    `}
    p{
        ${tw`
            border-2
            px-2
            cursor-pointer
            `}
        &:hover{
            ${tw`
                bg-gray-100    
            `}
        }
    }
    @media(max-width: 370px){
        p{
            ${tw`
                // text-[10px]
            `}
        }
    }
`

export const StyledTypeMenu = styled.div`
    ${tw`
        flex
        gap-2
        pb-1
    `}
    p{
        ${tw`
            border-2
            px-2
            cursor-pointer
        `}
        &:hover{
            ${tw`
                bg-gray-100    
            `}
        }
    }
`

export const StyledTableContainer = styled.div`
    ${tw`
        overflow-hidden
        w-full
    `}

  @media (max-width: 530px) {
        ${tw`
            overflow-x-auto
            `}
  }
`

export const StyledTable = styled.table`
    ${tw`
        w-full
        table-fixed
    `}
    @media (max-width: 530px) {
        min-width: 600px; // 테이블 최소 너비 설정 (스크롤 유도)
    }
`

export const StyledHead = styled.thead`
    ${tw`
        bg-gray-200
    `}
    th{
        padding: 4px;
    }
`


export const StyledBody = styled.tbody`
    ${tw`
        
    `}
    tr{
        border-bottom: 1px solid gray;
    }
    td{
        text-align: center;
        padding: 10px 8px;
    }
    td:first-child{
        ${tw`
            text-sm
        `}
    }
    td:last-child{
        ${tw`
            text-sm
        `}
    }
`
