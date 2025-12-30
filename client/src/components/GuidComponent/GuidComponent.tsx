import { useNavigate } from "react-router-dom"
import { StyledBtn, StyledContainer, StyledImage, StyledModalBox, StyledModalContent, StyledCloseBtn } from "./style"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useGuestLogin from "../../hooks/useGuestLogin";
import { toast } from "react-toastify";
import { useState } from "react";



interface GuidComponentProps{
    handleCloseModal: () => void
}

const GuidComponent = ({ handleCloseModal } : GuidComponentProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const {login } =useGuestLogin()
    const navigate = useNavigate()
    
    const handleGuestLogin = async () => {
        if(loading) return

        const toastId = toast.loading('게스트 계정 생성중...')
        
        login(undefined, {
            onSuccess: () => {
                toast.update(toastId, {
                    render: "반갑습니다! 게스트로 로그인되었습니다.",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                })
                handleCloseModal()
                navigate('/browse')
                toast.success('로그인 성공')
            },
            onError: () => {
                toast.update(toastId, {
                    render: "로그인에 실패했습니다. 다시 시도해주세요.",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                })
                setLoading(false)
            }
        })
    }


    
    
    return (
        <StyledContainer onClick={!loading ? handleCloseModal : undefined}>
            <StyledModalBox onClick={e => e.stopPropagation()}>
                <StyledCloseBtn onClick={handleCloseModal} disabled={loading}>
                    <FontAwesomeIcon icon={faXmark} size="xl" />
                </StyledCloseBtn>

                <h1>Guest Login</h1>

                <StyledModalContent>
                    <StyledImage>
                        <img src="./emergency.png" alt="emergency-icon" />
                    </StyledImage>
                    <h2>
                        본 계정은 <span>현재 기기에서만</span> 유지 가능합니다.<br/>
                        로그아웃 시 데이터가 <span>영구 삭제</span>되니 주의하세요.
                    </h2>
                </StyledModalContent>

                <StyledBtn onClick={handleGuestLogin} disabled={loading}>
                    {loading ? "접속 중..." : "위 내용을 확인했습니다"}
                </StyledBtn>
            </StyledModalBox>
        </StyledContainer>
    )
}

export default GuidComponent
