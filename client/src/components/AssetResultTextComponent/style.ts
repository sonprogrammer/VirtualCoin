import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        w-full
        flex
        flex-col
        p-6
        h-full
        bg-zinc-900/30
    `}
    /* 보조 텍스트 색상 보정 */
    p, h3 {
        ${tw`text-zinc-500 font-medium`}
    }
`;

export const StyledTopBox = styled.div`
    ${tw`
        w-full
        flex
        pb-5
        justify-between
        px-2
    `}
`;

export const StyledTopBoxContents = styled.div`
    ${tw`
        flex
        flex-col
        gap-1
        p-1
    `}
    h2 {
        ${tw`
            text-zinc-400 /* 라벨을 더 밝게 */
            text-xs
            font-semibold
        `}
    }

    h1 {
        ${tw`
            text-white
            text-2xl /* 강조를 위해 크기 키움 */
            font-black
            flex
            items-center    
        `}
    }
    p {
        ${tw`
            text-[10px]
            text-zinc-500
        `}
    }

    @media(max-width: 550px){
        ${tw`
            flex-1
            items-start
        `}
        h1 { ${tw`text-lg`} }
    }
`;

export const StyledDivider = styled.div`
    ${tw`
        border-t border-zinc-800 my-2
    `}
`;

export const StyledBottomBox = styled.div`
    ${tw`
        w-full
        flex
        flex-wrap
        pt-4
        gap-y-4
    `}
`;

export const StyledBottomBoxContents = styled.div`
    ${tw`
        flex
        flex-col
        gap-1
        px-4
    `}
    flex: 1 1 50%; /* 2열 배치 */

    h2 {
        ${tw`
            text-zinc-400
            text-xs
            font-medium
        `}
    }

    h1 {
        ${tw`
            text-zinc-100
            font-bold
            text-lg
        `}
    }
    
    @media(max-width: 450px){
        ${tw`px-2`}
        h2 { ${tw`text-[10px]`} }
        h1 { ${tw`text-sm`} }
    }
`;

export const StyledBottomContentBox = styled.div`
    ${tw`
        flex
        items-baseline
        gap-1
    `}
    h1 {
        ${tw`font-bold text-zinc-100`} /* 기본은 밝은 회색/흰색 */
    }

    h3 {
        ${tw`text-zinc-500 text-xs`}
    }
`;

export const StyledRestOfMoney = styled.div`
    ${tw`
        flex
        flex-col
        w-full
        px-4
        mt-4
        pt-4
        border-t border-zinc-800/50
    `}
    h2 {
        ${tw`
            text-zinc-400
            text-xs
        `}
    }
    h1 {
        ${tw`
            text-red-400 /* 강조색 */
            font-black
            text-xl
        `}
    }
`;