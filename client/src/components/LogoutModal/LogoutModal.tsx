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
        <StyeldContainer onClick={handleCloseModal}>
            <StyeldBox onClick={stopPropagation}>
                <StyeldTitle>
                    <h1>로그아웃 하시겠습니까?</h1>
                    <p className='text-sm mt-3 text-gray-100'>⛔️ 게스트 계정은 계정이 삭제됩니다.⛔️<br/>🚨 랭킹페이지 내에서는 유지됩니다 🚨</p>
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
