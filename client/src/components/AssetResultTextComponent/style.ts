import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
        w-full
        flex
        flex-col
        p-5
        h-full
    `}
`

export const StyledTopBox = styled.div`
    ${tw`
        w-full
        flex
        pb-3
        justify-between
        px-5
    `}
`


export const StyledTopBoxContents = styled.div`
    ${tw`
        flex
        gap-2
        p-1
    `}
    h2{
        ${tw`
            text-stone-800
            text-sm
            flex
            items-center
        `}
    }

    h1{
        ${tw`
            font-bold
            flex
            items-center    
        `}
    }
    p{
        ${tw`
            text-xs
            flex
            items-end
        `}
    }
`

export const StyledDivider = styled.div`
    ${tw`
        border-[1px]
    `}
`

export const StyledBottomBox = styled.div`
    ${tw`
        w-full
        flex
        flex-wrap
        pt-3
        items-center
    `}
`


export const StyledBottomBoxContents = styled.div`
    ${tw`
        flex
        p-1
        justify-between
        px-5
    `}
    h2{
        ${tw`
            text-stone-800
            text-sm
            flex
            items-center
        `}
    }

    h1{
        ${tw`
            font-bold    
        `}
    }
    p{
        ${tw`
            text-xs
            flex
            items-end
        `}
    }
    flex: 1 1 calc(50% - 10px);
`

export const StyledBottomContentBox = styled.div`
    ${tw`
        flex
        gap-2
    `}
`
export const StyledRestOfMoney = styled.div`
    ${tw`
        flex
        w-[50%]
        px-5
        py-1
        justify-between
    `}
    h2{
        ${tw`
            text-stone-800
            text-sm
            flex
            items-center
        `}
    }

    h1{
        ${tw`
            font-bold    
        `}
    }
    p{
        ${tw`
            text-xs
            flex
            items-end
        `}
    }
`