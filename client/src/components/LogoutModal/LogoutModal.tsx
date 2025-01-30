import React from 'react'
import { StyeldBox, StyeldBtns, StyeldContainer, StyeldNoBtn, StyeldTitle, StyeldYesBtn } from './style'


interface LogoutModalProps{
    handleCloseModal: () => void;
    handleLogout: () => void;
}

const LogoutModal = ({handleCloseModal, handleLogout} : LogoutModalProps) => {

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation(); 
    };
    return (
        <StyeldContainer>
            <StyeldBox onClick={stopPropagation}>
                <StyeldTitle>
                    로그아웃 하시겠습니까?
                </StyeldTitle>
                <StyeldBtns>
                <StyeldYesBtn onClick={handleLogout}>YES</StyeldYesBtn>
                <StyeldNoBtn onClick={handleCloseModal}>NO</StyeldNoBtn>
                </StyeldBtns>
            </StyeldBox>
        </StyeldContainer>
    )
}

export default LogoutModal
