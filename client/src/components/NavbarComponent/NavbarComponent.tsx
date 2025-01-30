import { useEffect, useRef, useState } from 'react'
import { StyledAngle, StyledBurgerMenu, StyledContainer, StyledLogo, StyledLogout, StyledMenus, StyledMobileMenu } from './style'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import { LogoutModal } from '../LogoutModal'


const NavbarComponent = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [page, setPage] = useState<string>('')
    const menuRef = useRef<HTMLDivElement | null>(null)
    const burgerRef = useRef<HTMLDivElement | null>(null)
    const [logoutModal, setLogoutModal] = useState<boolean>(false)

   const menus = ['거래소', '자산', '입출금', '시장동향']

   const handlePageClick = (page: string) => {
        setPage(page)
   }

   const handleLogoutClick = (e: React.MouseEvent) => {
        setLogoutModal(true)
        e.stopPropagation();
   }

   const handleLogout = () => {
    //TODO 백엔드 로그아웃할 때 로직 처리하기 
    setLogoutModal(false)
   }

   const handleCloseModal = () => {
    setLogoutModal(false)
   }

   useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node) && !burgerRef.current?.contains(e.target as Node)) {
            setIsOpen(false) 
        }
        if (logoutModal && !menuRef.current?.contains(e.target as Node)) {
            setLogoutModal(false)
        }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
        document.removeEventListener('click', handleClickOutside)
    }
}, [logoutModal])
    
  return (
    <StyledContainer>
        <img src="/alpha.png" alt="logo" />
      <StyledMenus>
        {menus.map(item => (
            <h2 key={item} onClick={() => handlePageClick(item)}
            style={{fontWeight: page === item ? 'bold' : 'normal'}}>
                {item}
            </h2>
        ))}
      </StyledMenus>

      <StyledLogout onClick={handleLogoutClick}>
        <h2>Logout</h2>
      </StyledLogout>

      <StyledBurgerMenu ref={burgerRef} onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={isOpen ? faXmark : faBars} size="2x" />
      </StyledBurgerMenu>

    {isOpen &&
        <StyledMobileMenu ref={menuRef}>
        <StyledAngle></StyledAngle>
        {menus.map(item => (
            <p key={item} onClick={() => handlePageClick(item)}
            style={{fontWeight: page === item ? 'bold' : 'normal'}}>
                {item}
            </p>
        ))}
        <p onClick={handleLogoutClick}>Logout</p>
        </StyledMobileMenu>
    }

    {logoutModal && <LogoutModal handleLogout={handleLogout}  handleCloseModal={handleCloseModal}/>}


    </StyledContainer>
  )
}

export default NavbarComponent
