import React, { useState } from 'react'
import { StyledCloseBtn, StyledContainer, StyledModalContent, StyledText } from './style'


interface LoginModalProps{
    closeModal: () => void
}


const LoginModal = ({closeModal} : LoginModalProps) => {

    const clickNoPropagation = (e: React.MouseEvent) =>{
        e.stopPropagation();
    }
    
    return (
        
            <StyledContainer onClick={closeModal}>
                <StyledModalContent onClick={clickNoPropagation}>
                    <h1>Login</h1>
                    <StyledCloseBtn onClick={closeModal}>X</StyledCloseBtn>
                    <StyledText>
                        로그인 종류<br />
                        카카오톡<br />
                        구글 <br />
                        x
                    </StyledText>
                </StyledModalContent>
            </StyledContainer>
    )
    
}

export default LoginModal
