import { aliases } from './../../../node_modules/@fortawesome/free-solid-svg-icons/faExclamationCircle.d';
import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledContainer = styled.div`
    ${tw`
        bg-gray-800
        inset-0
        flex
        items-center
        justify-center
        fixed
        bg-opacity-50
        z-50
    `}
`

export const StyledBox = styled.div`
    ${tw`
        bg-gray-300
        w-[80%]
        rounded-3xl
        p-10
    `}
`

export const StyledLogo = styled.div`
    ${tw`
        flex
        justify-center
        border-b-2
    `}
    img{
        margin-bottom: 10px;
    }
`

export const StyledContent = styled.div`
    ${tw`
        mt-[20px]
        text-lg
    `}
    p{
        color: red;
        font-weight: bold;
        margin-top: 10px;
    }
`