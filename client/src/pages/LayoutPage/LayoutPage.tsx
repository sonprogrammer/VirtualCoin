
import { NavbarComponent } from '../../components'
import { Outlet } from 'react-router-dom'
import { StyledContaier, StyledNavbarWrapper, StyledOutletWrapper } from './style'

const LayoutPage = () => {
  return (
    <StyledContaier>
      <StyledNavbarWrapper>
        <NavbarComponent />
      </StyledNavbarWrapper>
      <StyledOutletWrapper>
        <Outlet />
      </StyledOutletWrapper>
    </StyledContaier>
  )
}

export default LayoutPage
