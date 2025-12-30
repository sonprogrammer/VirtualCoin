import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
  ${tw`flex flex-col w-full px-4 md:px-8 bg-zinc-950 text-white min-h-screen`}
`;

export const StyledTitle = styled.div`
  ${tw`flex justify-between items-center w-full py-8`}
  h1 { ${tw`text-2xl font-black text-white`} }
  p { ${tw`text-zinc-500 text-xs`} }
  h2 { ${tw`text-lg font-bold text-red-500 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20`} }
`;

export const StyledBox = styled.div`
  ${tw`w-full max-w-5xl overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800 shadow-2xl mb-20`}
`;

export const StyledTable = styled.table`
  ${tw`w-full border-collapse table-fixed`}
`;

export const StyledTableHead = styled.thead`
  ${tw`bg-zinc-900 border-b border-zinc-800`}
  th {
    ${tw`p-4 text-xs font-bold text-zinc-500 uppercase tracking-widest text-center`}
  }
`;

export const StyledTableBody = styled.tbody`
  tr {
    ${tw`border-b border-zinc-800/50 transition-colors cursor-default`}
    &:hover { ${tw`bg-zinc-800/30`} }
    
    &:nth-child(1) { ${tw`bg-yellow-500/5`} }
    &:nth-child(2) { ${tw`bg-zinc-400/5`} }
    &:nth-child(3) { ${tw`bg-orange-900/5`} }
  }

  .me {
    ${tw`bg-red-500/10 border-y border-red-500/30`}
    td { ${tw`text-red-500 font-bold`} }
  }

  td {
    ${tw`p-4 text-sm text-center font-mono`}
    @media (max-width: 530px) { ${tw`p-2 text-[10px]`} }
  }
  
  .rank-badge {
    ${tw`inline-flex items-center justify-center w-8 h-8 rounded-full font-black`}
  }
`;

export const StyledBtns = styled.div`
  ${tw`flex w-full justify-center py-8 gap-2 bg-zinc-900/30`}
  button {
    ${tw`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-all`}
    &.active { ${tw`bg-red-600 text-white`} }
    &:not(.active) { ${tw`bg-zinc-800 text-zinc-500 hover:bg-zinc-700 hover:text-white`} }
  }
`;