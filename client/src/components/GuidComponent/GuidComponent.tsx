import { useNavigate } from "react-router-dom"
import { StyledBtn, StyledContainer, StyledImage, StyledModalBox, StyledModalContent } from "./style"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { StyledCloseBtn } from "../LoginModal/style";
import useGuestLogin from "../../hooks/useGuestLogin";



interface GuidComponentProps{
    handleCloseModal: () => void
}

const GuidComponent = ({ handleCloseModal } : GuidComponentProps) => {
    useGuestLogin();
    
    const navigate = useNavigate()
    
    const handleGuestLogin = async () => {
        handleCloseModal()
        navigate('/browse')
    }


    
    
    return (
        <StyledContainer onClick={handleCloseModal}>
            <StyledModalBox onClick={e => e.stopPropagation()}>
                <StyledCloseBtn onClick={handleCloseModal}>
                    <FontAwesomeIcon icon={faXmark} size="2x" onClick={handleCloseModal}/>
                </StyledCloseBtn>
                <h1>게스트 계정</h1>
                <StyledModalContent>
                    <StyledImage>
                        <img src="./emergency.png" alt="emergency-icon" />
                    </StyledImage>
                    <h2>
                    ⛔️본 계정은 현재 기기에서만 게스트
                        유지가 가능합니다.⛔️
                    </h2>
                </StyledModalContent>
                <StyledBtn onClick={handleGuestLogin}>
                        <p>넵, 이해했습니다.</p>
                </StyledBtn>
            </StyledModalBox>
        </StyledContainer>
    )
}

export default GuidComponent
