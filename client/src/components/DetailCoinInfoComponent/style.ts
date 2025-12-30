import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        flex w-full justify-between py-5
        border-b border-zinc-900 bg-zinc-950
    `}
    @media(max-width: 450px){ ${tw`flex-col gap-4`} }
`;

export const StyledLeftInfo = styled.div`
    ${tw`flex items-center gap-8`}
    @media(max-width: 790px){ ${tw`flex-col items-start gap-2`} }
    @media(max-width: 450px){ ${tw`flex-row justify-between w-full`} }
`;

export const StyledCLogoImg = styled.div`
    ${tw`flex items-center gap-4`}
    img { ${tw`w-12 h-12 rounded-full bg-white p-0.5`} }
    p { ${tw`text-2xl font-black text-white`} }
`;

export const StyledTitlePrice = styled.div`
    ${tw`flex flex-col items-start`}
    p:first-child {
        ${tw`text-2xl font-black flex items-baseline gap-1`}
    }
    p:last-child {
        ${tw`text-xs font-bold flex gap-1 mt-1`}
    }
`;

export const StyledCoinInfo = styled.div`
    ${tw`flex text-xs gap-6 py-1`}
    span:first-child { ${tw`text-zinc-500 font-medium`} }  
`;

export const StyledPrices = styled.div`
    ${tw`flex flex-col gap-2 min-w-[120px]`}
    p {
        ${tw`flex justify-between border-b border-zinc-900 pb-1`}
        span:last-child { ${tw`font-bold`} }
    }
`;

export const StyledRates = styled(StyledPrices)``;

export const StyledRateNumbers = styled.div`
    ${tw`flex items-baseline gap-1 font-bold text-zinc-200`}
    span:last-child { ${tw`text-[10px] text-zinc-600 font-normal uppercase`} }
`;

export const StyledLikedBtn = styled.div`
    ${tw`
        flex items-center justify-center
        border border-zinc-800 bg-zinc-900/50
        rounded-lg w-9 h-9 cursor-pointer
        transition-colors hover:bg-zinc-800
    `}
    svg { ${tw`text-zinc-500`} }
`;

export const StyledConInfoWrapper = styled.div`
    ${tw`flex items-center`}
    @media(max-width: 450px){
        ${tw`bg-zinc-900/30 p-3 rounded-lg border border-zinc-900`}
    }
`;