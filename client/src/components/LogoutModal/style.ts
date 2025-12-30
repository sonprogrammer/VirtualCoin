import styled from "styled-components";
import tw from "twin.macro";

export const StyeldContainer = styled.div`
    ${tw`
        fixed inset-0 
        flex items-center justify-center
        bg-black/70 backdrop-blur-sm 
        z-[2000] 
    `}
`;

export const StyeldBox = styled.div`
    ${tw`
        w-[90%] max-w-[400px]
        bg-zinc-900 border border-zinc-800
        rounded-3xl p-8
        flex flex-col gap-8
        shadow-2xl
    `}
`;

export const StyeldTitle = styled.div`
    ${tw`text-center`}
    h1 {
        ${tw`text-zinc-100 text-xl font-bold mb-4`}
    }
    p {
        ${tw`text-zinc-400 text-sm leading-relaxed`}
        span.warning { ${tw`text-red-500 font-bold`} }
    }
`;

export const StyeldBtns = styled.div`
    ${tw`flex gap-3 w-full`}
`;

export const StyeldYesBtn = styled.div`
    ${tw`
        flex-1 flex items-center justify-center
        cursor-pointer rounded-xl py-3
        bg-red-600 text-white font-bold
        hover:bg-red-500 active:scale-95 transition-all
    `}
`;

export const StyeldNoBtn = styled.div`
    ${tw`
        flex-1 flex items-center justify-center
        cursor-pointer rounded-xl py-3
        bg-zinc-800 text-zinc-300 font-bold
        hover:bg-zinc-700 active:scale-95 transition-all
    `}
`;