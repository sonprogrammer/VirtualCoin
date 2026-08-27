import styled from "styled-components";
import tw from "twin.macro";

export const StyledCoin = styled.div`
  ${tw`
    flex
    items-center
    w-full
    cursor-pointer
    px-5
    py-3
    border-b
    border-zinc-900
    transition-colors
  `}

  > div {
    ${tw`
      flex
      flex-1
      items-center
      gap-2
      text-left
    `}
  }

  > p {
    ${tw`
      flex-1
      text-center
      text-sm

    `}
  }

  > p:last-child {
    ${tw`
      text-right
    `}
  }

  &:hover {
    ${tw`
        bg-zinc-800
    `}
  }
`;