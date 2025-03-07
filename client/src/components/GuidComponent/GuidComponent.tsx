import { Link, useNavigate } from "react-router-dom"
import { StyledBtn, StyledContainer, StyledImage, StyledModalBox, StyledModalContent } from "./style"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { StyledCloseBtn } from "../LoginModal/style";
import useGuestLogin from "../../hooks/useGuestLogin";
import axios from "axios";



interface GuidComponentProps{
    handleCloseModal: () => void
}

const GuidComponent = ({ handleCloseModal } : GuidComponentProps) => {
    // const { guestNickName,isLoading, isError  } = useGuestLogin();
    // console.log('geust', guestNickName)
    
    const navigate = useNavigate()
    
    const handleGuestLogin = async () => {
        const res = await axios.post('http://localhost:3000/api/user/guest-login')
        console.log('res', res)
        // if (isLoading) return; 
        // if (isError) return; 
        handleCloseModal()
        
    }

    
    // const generateGuestNickname = () => {
    //     const randomName = Math.floor(Math.random()*10000).toString().padStart(4, '0')
    //     return `VC_${randomName}`
    // }

    // const handleGuestLogin = () => {
    //     const guestName = generateGuestNickname()

    //     const guestData = {
    //         nickname: guestName,
    //         isGuest: true
    //     }

    //     localStorage.setItem('guestUser', JSON.stringify(guestData))

    //     handleCloseModal()
    //     navigate('/browse')
    // }
    
    
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
