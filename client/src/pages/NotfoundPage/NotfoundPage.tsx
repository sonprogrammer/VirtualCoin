
import { useNavigate } from 'react-router-dom'
import { 
  StyledContainer, 
  ErrorCode, 
  MessageWrapper, 
  HomeButton 
} from './style'

const NotfoundPage = () => {
  const navigate = useNavigate()
  return (
    <StyledContainer>

      <ErrorCode>404</ErrorCode>

      <MessageWrapper>
        <h2>시장 정보를 찾을 수 없습니다.</h2>
        <p>
          요청하신 페이지가 존재하지 않거나 경로가 변경되었습니다.<br/>
          입력하신 URL을 다시 한번 확인해주세요.
        </p>
        
        <HomeButton onClick={() => navigate('/browse')}>
          거래소로 돌아가기
        </HomeButton>
      </MessageWrapper>
    </StyledContainer>
  )
}

export default NotfoundPage
