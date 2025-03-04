import styled from "styled-components";
import tw from "twin.macro";

export const StyledContaier = styled.div`
    ${tw`
        flex
        flex-col
        h-screen
        w-full
    `}
`
export const StyledNavbarWrapper = styled.div`
    ${tw`
        w-full
        fixed
        top-0
        bg-white
        z-10
    `}
`
export const StyledOutletWrapper = styled.div`
    ${tw`
        mt-[82px]
        grow
        flex-1
        bg-stone-100
    `}
    
`