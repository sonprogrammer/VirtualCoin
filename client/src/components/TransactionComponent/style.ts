import styled, { keyframes } from 'styled-components';
import tw from 'twin.macro';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledContainer = styled.div`
    ${tw`w-full bg-zinc-950 text-zinc-100`}
`;

export const StyledPeriodAndType = styled.div`
    ${tw`flex px-6 py-4 flex-col justify-center gap-3`}
`;

export const StyledDetail = styled.div`
    ${tw`flex justify-between items-start pb-2`}
    

    h1 {
        ${tw`bg-zinc-800 text-zinc-300 text-xs py-1.5 px-3 cursor-pointer transition-colors`}
        border-radius: 8px;
        &:hover { ${tw`bg-zinc-700 text-white`} }
    }
`;

export const StyledSelect = styled.div`
    ${tw`flex flex-col gap-2`}
    h2 {
        ${tw`cursor-pointer py-1.5 px-4 rounded-lg bg-zinc-900 border border-zinc-800 text-sm font-bold transition-all`}
        &:hover { ${tw`border-red-500 text-red-500`} }
    }
`;

export const StyledDate = styled.div`
    ${tw`text-[11px] flex items-center bg-zinc-900/50 py-2 px-4 gap-4 rounded-md border border-zinc-800/50`}
    h3 { ${tw`text-zinc-400`} }
`;


export const StyledPeriodBurgerMenu = styled.div`
    ${tw`flex gap-2 py-2 `}
      animation: ${fadeIn} 0.4s ease-out;
    p {
        ${tw`bg-zinc-800 border border-zinc-700 text-[11px] px-3 py-1 rounded-full cursor-pointer transition-all`}
        &:hover { ${tw`bg-red-600 border-red-600 text-white`} }
    }
`;

export const StyledTypeMenu = styled(StyledPeriodBurgerMenu)``;

export const StyledTableContainer = styled.div`
    ${tw`w-full overflow-hidden border-t border-zinc-900`}
    @media (max-width: 530px) { ${tw`overflow-x-auto`} }
`;

export const StyledTable = styled.table`
    ${tw`w-full table-fixed border-collapse`}
    @media (max-width: 530px) { min-width: 650px; }
`;

export const StyledHead = styled.thead`
    ${tw`bg-zinc-900/80`}
    th {
        ${tw`py-3 px-2 text-[11px] font-bold text-zinc-500 text-center uppercase tracking-tighter`}
    }
`;

export const StyledBody = styled.tbody`
    tr {
        ${tw`border-b border-zinc-900 transition-colors hover:bg-zinc-900/30`}
    }
    td {
        ${tw`text-center py-4 px-2 text-sm text-zinc-300`}
    }

    td:first-child, td:last-child {
        ${tw`text-[11px] text-zinc-500 font-mono`}
    }
`;