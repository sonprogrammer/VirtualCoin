import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`w-full h-full bg-zinc-950`}
`;

export const StyledTop = styled.div`
    ${tw`
        w-full p-4 flex justify-end gap-2
        border-b border-zinc-900 bg-zinc-900/30
    `}
    p {
        ${tw`
            text-xs font-bold py-1.5 px-3 
            rounded-md border border-zinc-700 
            text-zinc-400 cursor-pointer transition-all
        `}
        &:hover {
            ${tw`bg-zinc-800 text-zinc-100 border-zinc-500`}
        }
        &:first-child {
            ${tw`border-red-900/50 text-red-500 hover:bg-red-950/30`}
        }
    }
`;

export const StyledTable = styled.table`
    ${tw`w-full border-collapse`}
    @media(max-width: 750px) { ${tw`text-sm`} }
`;

export const StyledTableHead = styled.thead`
    ${tw`bg-zinc-900/50 border-b border-zinc-800`}
    th {
        ${tw`py-4 px-1 text-[11px] font-bold text-zinc-500 uppercase`}
    }
`;

export const StyledTableBody = styled.tbody`
    tr {
        ${tw`border-b border-zinc-900 cursor-pointer transition-colors`}
        &:hover { ${tw`bg-zinc-900/40`} }
        
        /* 선택된 행 하이라이트 */
        &.selected {
            ${tw`bg-red-500/5`}
        }
    }

    td {
        ${tw`text-center py-4 text-zinc-300 font-medium`}
        
        /* 주문취소 버튼 스타일 */
        button {
            ${tw`
                bg-zinc-800 text-zinc-400 text-[10px] 
                py-1 px-2 rounded transition-all
                hover:bg-zinc-700 hover:text-white
            `}
        }

        /* 날짜/시간 텍스트 */
        p:first-child { ${tw`text-[11px] text-zinc-500`} }
        p:last-child { ${tw`text-xs text-zinc-400 font-mono`} }
    }

    /* 체크박스 커스텀 (다크모드용) */
    input[type="checkbox"] {
        ${tw`accent-red-600 w-4 h-4`}
    }
`;