import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        flex
        items-center
        gap-10
        px-5
        py-2
        border-b-2
        relative
        w-full
    `}
    h2{
        ${tw`
            text-3xl
        `}
    }
    
    @media(max-width:1024px){
        padding: 10px 10px 10px 10px;
    }

    @media (max-width: 730px) {
        gap: 20px;
    }

    @media (max-width: 630px) {
        gap: 10px;
        justify-content: center;
    }

    @media (max-width: 390px) {
        gap: 5px;
    }
    
       
`

export const StyledLogo = styled.div`
    ${tw`
        flex
        items-center
        w-[64px]
    `}

    @media (max-width: 630px) {
        flex
        justify-center
        mx-auto
        img{
        max-width: 100%;}
    }

`


export const StyledMenus = styled.div`
    ${tw`
        flex
        gap-10
    `}
    
    @media (max-width: 630px) {
        display:none;
    }
    
    h2{
        cursor:pointer;
        font-size: 1.5rem;
    }
    
    @media(max-width: 730px){
        gap: 10px;
    }
`

export const StyledUserIcon = styled.div`
    ${tw`
        absolute
        right-4
        cursor-pointer
        w-12
    `}
    

    @media (max-width: 630px) {
        display: none;
    }
`


export const StyledUserInfo = styled.div`
    ${tw`
        absolute
        bg-gray-300
        rounded-xl
        p-5
        right-6
        top-[80px]
        w-[250px]
    `}
        box-shadow: 0px 4px 6px rgba(0,0,0, 0.3);
        p{
            ${tw`
                flex
                justify-between
                py-2
                px-2
            `}
        }

        hr{
            background-color: white;
            margin: 5px 0;
        }
        span{
            font-weight: bold;
        }
`

export const StyledLogout = styled.div`
    ${tw`
        flex
        justify-center
        cursor-pointer
        bg-black
        text-white
        rounded-3xl
        font-bold
    `}
`


export const StyledBurgerMenu = styled.div`
    ${tw`
        cursor-pointer
    `}
    display: none;
    @media(max-width: 630px){
        display: block;
        position: absolute;
        right: 20px;
    }
`

export const StyledMobileMenu = styled.div`
    ${tw`
        absolute
        top-20
        right-3
        w-[30%]
        bg-gray-800
        text-white
        flex
        flex-col
        items-center
        rounded-xl
        `}
        p{
            ${tw`
                w-full
                text-center
                py-4
                rounded-xl
                cursor-pointer
    `}
        &:hover{
            ${tw`
                bg-gray-700
                `}
            }
    }
`

export const StyledAngle = styled.div`
    ${tw`
        absolute
        top-[-8px]
        right-2
        `}
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid rgb(209, 212, 217);
`