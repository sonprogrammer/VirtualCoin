import { useState } from 'react'
import { StyledContainer, StyledMoreBtn } from './style'
import { InfoModal } from '../../components'

const MainPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const moreClike = () => {
    setOpenModal(true)
  }

  const closeModal = () => {
    setOpenModal(false)
  }
  
  return (
    <StyledContainer>
      <h1>남녀노소 누구나 투자하는 시대!</h1>
      <h1>배우고 시작해라</h1>
      <StyledMoreBtn onClick={moreClike}>알아보기</StyledMoreBtn>
      {openModal && (
         <InfoModal closeModal={closeModal}/>
      )}
    </StyledContainer>
  )
}

export default MainPage