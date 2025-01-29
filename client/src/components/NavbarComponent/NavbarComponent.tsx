import React from 'react'
import { StyledContainer, StyledLogout, StyledMenus } from './style'

const NavbarComponent = () => {
  return (
    <StyledContainer>
        <div>
            <img src="/alpha.png" alt="logo" />
        </div>
      <StyledMenus>
        <h2>거래소</h2>
        <h2>자산</h2>
        <h2>입출금</h2>
        <h2>시장동향</h2>
      </StyledMenus>
      <StyledLogout>
        <h2>Logout</h2>
      </StyledLogout>
    </StyledContainer>
  )
}

export default NavbarComponent
