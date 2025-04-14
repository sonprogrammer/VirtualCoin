
import { NavbarComponent } from '../../components'
import { Outlet } from 'react-router-dom'
import { StyledContaier, StyledNavbarWrapper, StyledOutletWrapper } from './style'
import useGetCoins from '../../hooks/useGetCoins'
import useWebSocket from '../../hooks/useWebSocket'

const LayoutPage = () => {

  const { data: coinName} = useGetCoins();
  useWebSocket(coinName)

  return (
    <StyledContaier className='전체최종'>

      <StyledNavbarWrapper className='nabarwrapper'>
        <NavbarComponent />
      </StyledNavbarWrapper>

      <StyledOutletWrapper className='outlet'>
        <Outlet />
      </StyledOutletWrapper>

    </StyledContaier>
  )
}

export default LayoutPage
