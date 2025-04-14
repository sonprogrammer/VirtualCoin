import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
        h-full
    `}
`
export const StyledTotalAsset = styled.div`
    ${tw`
        flex
        w-full
    `}
`

export const StyledAssetGraph = styled.div`
    ${tw`
      flex w-full justify-center
    `}
`

export const StyledAssetGraphToggle = styled.div`
    ${tw`
        p-2
        px-4
        border-t-2
        justify-between
        w-full
        flex
        cursor-pointer
    `}
    &:hover{
        ${tw`
            bg-gray-200
        `}
    }
`
