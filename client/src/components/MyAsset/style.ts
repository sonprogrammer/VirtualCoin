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
export const StyledAssetResultText = styled.div`
    ${tw`
        
    `}
`
export const StyledAssetGraph = styled.div`
    ${tw`
      
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

export const StyledAssetList = styled.div`
    ${tw`

    `}
`
