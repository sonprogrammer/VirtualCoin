import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        flex
        items-center
        justify-center
        bg-gray-800
        fixed
        bg-opacity-50
        inset-0
        z-50
        p-[20px]
    `}
`

export const StyledModalContent = styled.div`
  ${tw`
    bg-white
    p-8
    rounded-xl
    w-full
    h-[50%]
  `}
  h1{
    ${tw`
      flex
      justify-center
      font-bold
      text-xl
    `}
  }
`;

export const StyledCloseBtn = styled.div`
    ${tw`
        absolute
        right-5
        top-5
    `}
    &:hover{
        cursor: pointer;
    }
`

export const StyledText = styled.div`
  ${tw`
    text-center
    text-xl
    font-semibold
    text-gray-800
    flex
    flex-col
    mt-10
  `}
`;