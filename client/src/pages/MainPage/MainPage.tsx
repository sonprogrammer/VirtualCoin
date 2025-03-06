

import { CoinChartComponent } from '../../components'
import { LoginDoubleCheckModalComponent } from '../../components/LoginDoubleCheckModalComponent'
import { StyledContainer } from './style'

const MainPage = () => {
  return (
    <StyledContainer className='main'>
      <CoinChartComponent />
      
      {/* <LoginDoubleCheckModalComponent /> */}
    </StyledContainer>
  )
}

export default MainPage