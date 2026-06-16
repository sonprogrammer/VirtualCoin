import styled from "styled-components";
import tw from "twin.macro";


export const StyledContainer = styled.div`
    ${tw`
        fixed
        inset-0
        bg-black
        bg-opacity-50
        z-50
        flex
        justify-center
        items-center
        z-[9999]
    `}
`

export const StyledModal = styled.div`
    ${tw`
        bg-slate-900
        border border-slate-700
        rounded-2xl
        shadow-2xl
        w-[50%]
        p-5
        flex
        flex-col
        items-center
        h-[50%]
        text-center
    `}
    
    @media(max-width: 730px){
        width: 80%;
    }
    @media(max-width: 630px){
        width: 90%;
    }
`


export const StyledContentTitle = styled.div`
    ${tw`
        flex
        justify-around
        w-full
        border-b-2
        py-2
        `}
        p{
            ${tw`
                flex-1
                flex
                justify-center
            `}
        }
        
`

export const StyledContent = styled.div`
    ${tw`
        flex
        flex-col
        items-center
        w-full
        overflow-y-auto
        mt-1
    `}
`
    
