import styled from "styled-components";
import tw from "twin.macro";

export const StyledContainer = styled.div`
    ${tw`
        flex
        items-center
        gap-10
        // justify-between
        px-5
        py-2
        border-b-2
        relative
    `}
    h2{
        ${tw`
            text-3xl
        `}
    }

    @media (max-width: 730px) {
        gap: 20px;
    }

    @media (max-width: 630px) {
        gap: 10px;
    }

    @media (max-width: 390px) {
        gap: 5px;
    }
       
`

export const StyledLogo = styled.div`
    ${tw`

    `}
    img{
     @media (max-width: 730px) {

    }

    @media (max-width: 630px) {

    }

    @media (max-width: 390px) { 
    }
      }
`


export const StyledMenus = styled.div`
    ${tw`
        flex
        gap-5
    `}
    @media (max-width: 730px) {
      font-size: 1.7rem; 
      gap: 10px;
    }

    @media (max-width: 630px) {
      font-size: 1.5rem; 
      gap: 7px;
    }

    @media (max-width: 390px) {
      font-size: 0.7rem; 
      gap: 3px;
    }
    h2{
        cursor:pointer;
        font-size: 2rem;

    
    }
`

export const StyledLogout = styled.div`
    ${tw`
        absolute
        right-5
    `}
    &:hover{
        cursor: pointer;
    }
       
    h2{
    font-size: 2rem;
    
        @media (max-width: 730px) {
            font-size: 1.7rem; 
        }
        
        @media (max-width: 630px) {
      font-size: 1.5rem; 
    }
    }
`