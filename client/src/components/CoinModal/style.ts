import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
  ${tw`
    fixed
    inset-0
    z-[9999]
    flex
    items-center
    justify-center
    bg-black/70
    px-4
    backdrop-blur-sm
  `}
`;

export const StyledModal = styled.div`
  ${tw`
    flex
    w-full
    max-w-[620px]
    max-h-[70vh]
    flex-col
    overflow-hidden
    rounded-2xl
    border border-zinc-800
    bg-zinc-950
    shadow-2xl
  `}

  @media (max-width: 730px) {
    ${tw`
      max-h-[75vh]
      rounded-xl
    `}
  }
`;

export const StyledContentTitle = styled.div`
  ${tw`
    flex
    w-full
    items-center
    border-b border-zinc-800
    bg-zinc-900/50
    px-5
    py-3
  `}

  p {
    ${tw`
      flex-1
      text-center
      text-[11px]
      font-medium
      text-zinc-500
    `}

    &:first-child {
      ${tw`text-left`}
    }

    &:last-child {
      ${tw`text-right`}
    }
  }
`;

export const StyledContent = styled.div`
  ${tw`
    flex
    min-h-0
    w-full
    flex-1
    flex-col
    overflow-y-auto
  `}

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    ${tw`
      rounded-full
      bg-zinc-700
    `}
  }

  &::-webkit-scrollbar-thumb:hover {
    ${tw`bg-zinc-600`}
  }
`;