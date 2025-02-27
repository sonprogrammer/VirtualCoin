import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        flex
        items-center
        gap-5
        px-5
        py-2
        border-b-2
        relative
        w-full
        h-[82px]

    `}

    h2{
        ${tw`
            text-3xl
        `}
    }
    

    @media (max-width: 630px) {
        gap: 10px;
        justify-content: center;
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
    }

`


export const StyledDeskMenus = styled.div`
    ${tw`
        flex
        gap-10
        items-center
        w-full

    `}
    
    h3{
        cursor:pointer;
        font-size: 1.2rem;
        }
    
    @media(max-width:1024px){
        gap: 10px;
    }
`

export const StyledDeskInput = styled.div`
    ${tw`
        flex
        flex-1
        block
        pl-5
    `}
    p{
        ${tw`
            text-gray-400
            border-2
            px-20
            pl-3
            py-2
            rounded-xl
            text-left
            w-[60%]
        `}

        &:hover{
            ${tw`
                border-red-500
            `}
        }
        @media(min-width:1024px){
            width: 50%;
            }
    }
      
    
`


export const StyledTablet = styled.div`
    ${tw`
        hidden
    `}
     @media(max-width: 730px){
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
     }
`

export const StyledTabletInput = styled.div`
    ${tw`
        flex-1
        flex
        justify-center
    `}

    p{
        ${tw`
            text-gray-400
            border-2
            px-20
            pl-3
            py-2
            rounded-xl
            text-left
        `}
        &:hover{
            ${tw`
                border-red-500
            `}
        }
    }
`

export const StyledTabletTab = styled.div`
    ${tw`
        cursor-pointer
    `}
`

export const StyledTabletMenu = styled.div`
    ${tw`
        absolute
        bg-white
        right-0
        border-2
        top-[72px]
        z-10
    `}
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
    p{
        padding: 15px 20px;
    }
    
    p:hover{
        background-color: rgba(0, 0, 0, 0.2);
    }
    

    a:not(:last-child) p {
        border-bottom: 1px solid #ccc;
  }
`



export const StyledSearchIcon = styled.div`
    ${tw`
        absolute
        right-20
        p-1
        cursor-pointer
    `}
`


export const StyledSearchWrapper = styled.div`
    ${tw`
        flex
        w-full
        relative
        justify-center
        items-center
        p-2
    `}
    input{
        border: 2px solid black;
        border-radius: 20px;
        padding: 10px;

        &:focus{
            border-color: red;
            outline: none;
        }
    }
`

export const StyledCloseBtn = styled.div`
    ${tw`
        absolute
        left-0
        cursor-pointer
        p-3
    `}
    &:hover{
        background-color: rgba(140, 140, 140, 0.7);
        border-radius: 50%;
    }
`



export const StyledMobileMenu = styled.div`
    ${tw`
        fixed
        bottom-0
        left-0
        w-full
        flex
        justify-around
        items-center
        // border-t-2
        bg-red-500
        text-white
    `}
    
    a{
        ${tw`
            w-full
        `}
    }

    p{
        padding: 16px;
        width: 100%;
        height: 100%;
        text-align: center;
    }
  
    p:hover{
        background-color: rgb(255,154,154);
    }
`



export const StyledUserIcon = styled.div`
    ${tw`
        absolute
        right-4
        cursor-pointer
        w-12
        
    `}

    @media(max-width:730px){
        right: 76px;
    }
    

    @media (max-width: 630px) {
        // position: fixed;
        top: 16px;
        right: 16px;
    }
`


export const StyledUserInfo = styled.div`
    ${tw`
        absolute
        bg-gray-300
        rounded-xl
        p-5
        right-6
        top-[72px]
        w-[250px]
    `}
    z-index: 1000;
        box-shadow: 0px 4px 6px rgba(0,0,0, 0.3);
        p{
            ${tw`
                flex
                justify-between
                p-2
            `}
        }

        hr{
            background-color: white;
            margin: 5px 0;
        }
        span{
            font-weight: bold;
            cursor: pointer;
        }
        
        span:first-child:hover{
            background-color: red;
        }
        
        @media(max-width: 730px){
            right: 84px;
        }
        @media(max-width: 630px){
            top: 76px;
            right: 24px;
        }
`

export const StyledCoins = styled.div`
    ${tw`
        flex
        justify-between
        p-2
    `}
    span{
        padding: 4px 12px;
        border-radius: 10%;
    }
    span:first-child:hover{
        background-color: orange;
    }
    span:last-child:hover{
        background-color: white;
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
    @media(max-width: 630px){
        display: block;
        position: absolute;
        right: 20px;
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

export const StyledSearchModalBox = styled.div`
    ${tw`
        
    `}
`