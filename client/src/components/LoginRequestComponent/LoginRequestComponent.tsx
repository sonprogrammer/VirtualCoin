import { useRecoilState } from "recoil"
import { loginRequestState } from "../../context/loginRequestState"
import { StyledContainer, StyledBox } from "./style"
import { useNavigate } from "react-router-dom"


const LoginRequestComponent = () => {
    const [isOpen, setIsOpen] = useRecoilState(loginRequestState)

    const navigate = useNavigate()
    
    if(!isOpen) return null

    
    
    const handleLoginClick = () => {
        setIsOpen(false)
        navigate('/')
    }
    
    
  return (
    <StyledContainer>
        <StyledBox>
            <h1>로그인 후 이용 가능합니다.</h1>
            <p onClick={handleLoginClick}>로그인하러 가기</p>
        </StyledBox>
    </StyledContainer>
  )
}

export default LoginRequestComponent
