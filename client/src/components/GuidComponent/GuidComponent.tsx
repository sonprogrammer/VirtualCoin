import { useNavigate } from "react-router-dom"
import { StyledBtn, StyledContainer, StyledImage, StyledModalBox, StyledModalContent } from "./style"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { StyledCloseBtn } from "../LoginModal/style";
import useGuestLogin from "../../hooks/useGuestLogin";
import { toast } from "react-toastify";



interface GuidComponentProps{
    handleCloseModal: () => void
}

const GuidComponent = ({ handleCloseModal } : GuidComponentProps) => {
    
    const {login } =useGuestLogin()
    const navigate = useNavigate()
    
    const handleGuestLogin = async () => {
        login(undefined, {
            onSuccess: () => {

                handleCloseModal()
                navigate('/browse')
                toast.success('로그인 성공')
            },
            onError: () => {
                console.log('error')
                toast.error('게스트로ㅡㄱ인 실패 ')
            }
        })
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
                        유지가 가능합니다. 또한 로그아웃시 해당 계정은 삭제됩니다.
                        ⛔️
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
