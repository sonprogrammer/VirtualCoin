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
        bg-zinc-950
    `}
    z-index: 100;
`
export const StyledOutletWrapper = styled.div`
    ${tw`
        mt-[82px]
        grow
        flex-1
        text-white
        bg-zinc-950
    `}
    
`