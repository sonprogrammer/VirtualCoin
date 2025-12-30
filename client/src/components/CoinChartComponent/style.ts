import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
  ${tw`flex flex-col w-full px-4 md:px-8 bg-zinc-950 text-white min-h-screen`}
`;

export const StyledTitle = styled.div`
  ${tw`flex justify-between items-end w-full py-6`}
  h2 { ${tw`text-2xl font-black text-white`} }
  p { ${tw`text-zinc-500 text-xs font-mono`} }
`;

export const StyledTable = styled.table`
  ${tw`w-full border-collapse table-fixed bg-zinc-900/50 rounded-2xl overflow-hidden`}
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
`;

export const StyledTableHead = styled.thead`
  ${tw`bg-zinc-900 border-b border-zinc-800`}
  th {
    ${tw`p-4 text-xs font-bold text-zinc-500 uppercase tracking-wider`}
    button { ${tw`hover:text-red-500 transition-colors`} }
  }
`;

export const StyledTableBody = styled.tbody`
  tr {
    ${tw`border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors cursor-pointer`}
  }
  td { ${tw`p-4 text-sm [vertical-align:middle]`} }


  .price-font { ${tw`font-mono font-medium`} }
`;

export const StyledPageBtns = styled.div`
  ${tw`flex w-full justify-center py-10 gap-2`}
  button {
    ${tw`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-all`}
    &.active { ${tw`bg-red-600 text-white`} }
    &:not(.active) { ${tw`bg-zinc-900 text-zinc-500 hover:bg-zinc-800 hover:text-white`} }
  }
`;