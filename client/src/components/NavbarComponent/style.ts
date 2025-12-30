import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        flex items-center gap-5 px-5 py-2
        border-b border-zinc-900 
        relative w-full h-[82px]
        bg-zinc-950 text-zinc-100 
    `}
    z-index: 100;
`;

export const StyledLogo = styled.div`
    ${tw`flex items-center w-[64px] transition-transform hover:scale-105`}
    img { filter: brightness(1.1); } 
`;

export const StyledDeskMenus = styled.div`
    ${tw`flex gap-10 items-center w-full`}
    h3 {
        ${tw`cursor-pointer text-sm font-medium text-zinc-400 hover:text-white transition-colors`}
    }
`;

export const StyledDeskInput = styled.div`
    ${tw`flex flex-1 block pl-5`}
    p {
        ${tw`
            text-zinc-500 bg-zinc-900 border border-zinc-800
            px-10 pl-4 py-2 rounded-xl text-left text-sm w-[60%]
            cursor-pointer hover:border-zinc-600 transition-all
        `}
    }
`;

export const StyledTablet = styled.div`
    ${tw`hidden`}
     @media(max-width: 730px){
        ${tw`flex items-center justify-between w-full`}
     }
`;

export const StyledTabletInput = styled.div`
    ${tw`flex-1 flex justify-center`}
    p {
        ${tw`
            text-zinc-500 bg-zinc-900 border border-zinc-800
            px-10 pl-4 py-2 rounded-xl text-left text-sm
            hover:border-zinc-600
        `}
    }
`;

export const StyledTabletTab = styled.div`
    ${tw`cursor-pointer text-zinc-400 hover:text-white`}
`;

export const StyledTabletMenu = styled.div`
    ${tw`
        absolute
        bg-zinc-900
        border border-zinc-800
        right-4
        top-[76px] 
        rounded-xl
        overflow-hidden
        w-[180px]
    `}
    z-index: 1001; 
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);

    p {
        ${tw`px-6 py-4 text-sm text-zinc-300 hover:bg-zinc-800 transition-all`}
        border-bottom: 1px solid #27272a;
    }
    
    a:last-child p {
        border-bottom: none;
    }
`;

export const StyledSearchIcon = styled.div`
    ${tw`absolute right-20 p-1 cursor-pointer text-zinc-400 hover:text-white`}
`;

export const StyledMobileMenu = styled.div`
    ${tw`
        fixed bottom-0 left-0 w-full flex justify-around items-center
        bg-zinc-900 border-t border-zinc-800 text-zinc-400 z-50
    `}
    p { ${tw`py-4 text-xs font-bold transition-colors w-full text-center hover:bg-zinc-800`} }
`;

export const StyledUserIcon = styled.div`
    ${tw`
        absolute
        right-4
        cursor-pointer
        w-10
        h-10
    `}
    z-index: 40;

    @media(max-width:730px){
        right: 76px;
    }

    @media (max-width: 630px) {
        top: 20px;
        right: 16px;
    }
`;

export const StyledUserInfo = styled.div`
${tw`
    absolute
    bg-zinc-900
    border border-zinc-800
    rounded-2xl
    p-6
    right-6
    top-[76px]
    w-[280px]
`}
    z-index: 1100;
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.5);
    
    h1 { ${tw`text-zinc-100 text-lg border-b border-zinc-800 pb-3 mb-3 text-left font-bold`} }
    p {
        ${tw`flex justify-between items-center py-1 text-sm text-zinc-400`}
        strong { ${tw`text-zinc-500 font-medium`} }
        span { ${tw`text-zinc-200 font-mono`} }
    }
    hr { ${tw`border-zinc-800 my-4`} }
`;

export const StyledCoins = styled.div`
    ${tw`flex gap-2`}
    span {
        ${tw`
            flex-1 text-center py-2 px-2 rounded-lg text-xs
            bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all
        `}
    }
`;

export const StyledLogout = styled.div`
    ${tw`
        flex justify-center cursor-pointer
        bg-red-600 text-white py-2.5 rounded-xl
        font-bold text-sm mt-4 hover:bg-red-500 transition-colors
    `}
`;

export const StyledAngle = styled.div`
    ${tw`absolute top-[-8px] right-4`}
    width: 0; height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #27272a; 
`;