
import { NavbarComponent } from '../../components'
import { Outlet } from 'react-router-dom'
import { StyledContaier, StyledNavbarWrapper, StyledOutletWrapper } from './style'
import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { CoinPrice } from '../../context/CoinPrice'
import useGetCoins from '../../hooks/useGetCoins'
import useWebSocket from '../../hooks/useWebSocket'

const LayoutPage = () => {

  const { data: coinName, isLoading, error } = useGetCoins();
  useWebSocket(coinName)

  const prices = useRecoilValue(CoinPrice)
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
