import styled, { keyframes } from 'styled-components';
import tw from 'twin.macro';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledContainer = styled.div`
  ${tw`
    w-full
    overflow-hidden
    rounded-2xl
    border border-zinc-800
    bg-zinc-950
    text-zinc-100
  `}
`;

export const StyledPeriodAndType = styled.div`
  ${tw`
    flex
    flex-col
    gap-4
    border-b border-zinc-800
    px-5 py-5
  `}
`;

export const StyledDetail = styled.div`
  ${tw`
    flex
    items-center
    justify-between
  `}

  h1 {
    ${tw`
      cursor-pointer
      rounded-lg
      border border-zinc-800
      bg-zinc-900
      px-3 py-2
      text-xs
      font-medium
      text-zinc-400
      transition-colors
    `}

    &:hover {
      ${tw`
        border-zinc-700
        bg-zinc-800
        text-zinc-100
      `}
    }
  }
`;

export const StyledSelect = styled.div`
  ${tw`
    relative
    flex
    flex-col
    gap-3
  `}

  h2 {
    ${tw`
      cursor-pointer
      select-none
      rounded-lg
      border border-zinc-800
      bg-zinc-900
      px-4 py-2
      text-xs
      font-medium
      text-zinc-300
      transition-all
    `}

    &:hover {
      ${tw`
        border-zinc-700
        bg-zinc-800
        text-white
      `}
    }
  }
`;

export const StyledDate = styled.div`
  ${tw`
    flex
    flex-wrap
    items-center
    gap-x-6 gap-y-2
    text-xs
  `}

  h3 {
    ${tw`
      text-zinc-500
    `}
  }
`;

export const StyledPeriodBurgerMenu = styled.div`
  ${tw`
    flex
    flex-wrap
    gap-2
  `}

  animation: ${fadeIn} 0.18s ease-out;

  p {
    ${tw`
      cursor-pointer
      rounded-lg
      border border-zinc-800
      bg-zinc-900
      px-3 py-1.5
      text-xs
      text-zinc-400
      transition-all
    `}

    &:hover {
      ${tw`
        border-zinc-600
        bg-zinc-800
        text-zinc-100
      `}
    }
  }
`;

export const StyledTypeMenu = styled(StyledPeriodBurgerMenu)``;

export const StyledTableContainer = styled.div`
  ${tw`
    w-full
    overflow-hidden
  `}

  @media (max-width: 700px) {
    ${tw`overflow-x-auto`}
  }
`;

export const StyledTable = styled.table`
  ${tw`
    w-full
    table-fixed
    border-collapse
  `}

  @media (max-width: 700px) {
    min-width: 760px;
  }
`;

export const StyledHead = styled.thead`
  ${tw`
    bg-zinc-900/60
  `}

  th {
    ${tw`
      border-b border-zinc-800
      px-3 py-3
      text-center
      text-[11px]
      font-medium
      tracking-wide
      text-zinc-500
    `}
  }
`;

export const StyledBody = styled.tbody`
  tr {
    ${tw`
      border-b
      border-zinc-900
      transition-colors
    `}

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      ${tw`
        bg-zinc-900/60
      `}
    }
  }

  td {
    ${tw`
      px-3
      py-4
      text-center
      text-xs
      font-medium
      text-zinc-400
    `}
  }

  td:first-child,
  td:last-child {
    ${tw`
      text-[11px]
      font-normal
      text-zinc-600
    `}
  }
`;