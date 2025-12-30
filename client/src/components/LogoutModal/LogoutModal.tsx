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
                    <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-800">
                        <p>
                            <span className="text-red-500 font-bold block mb-1">⚠️ 게스트 계정 주의</span>
                            게스트 계정은 로그아웃 시 재로그인이 불가합니다.<br/>
                            (랭킹 내역은 유지됩니다)
                        </p>
                    </div>
                </StyeldTitle>
                
                <StyeldBtns>
                    <StyeldNoBtn onClick={handleCloseModal}>취소</StyeldNoBtn>
                    <StyeldYesBtn onClick={handleLogout}>로그아웃</StyeldYesBtn>
                </StyeldBtns>
            </StyeldBox>
        </StyeldContainer>
    )
}

export default LogoutModal
