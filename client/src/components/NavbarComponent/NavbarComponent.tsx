import { useEffect, useRef, useState } from 'react'
import { StyledAngle, StyledBurgerMenu, StyledContainer, StyledLogo, StyledLogout, StyledMenus, StyledMobileMenu } from './style'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
import { LogoutModal } from '../LogoutModal'
import { Link, useNavigate } from 'react-router-dom'


const NavbarComponent = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [page, setPage] = useState<string>('/browse')
    const menuRef = useRef<HTMLDivElement | null>(null)
    const burgerRef = useRef<HTMLDivElement | null>(null)
    const [logoutModal, setLogoutModal] = useState<boolean>(false)

    const navigate = useNavigate()
    
    const menus = [
      { name: '거래소', path: '/browse' },
      { name: '자산', path: '/asset' },
      { name: '입출금', path: '/bank' },
      { name: '시장동향', path: '/news' }
  ];

//   useEffect(() => {
//     setPage('/browse'); // 처음에 거래소 페이지로 설정
//     navigate('/browse');  // 거래소 페이지로 이동
// }, [navigate]);

   const handlePageClick = (path: string) => {
        setPage(path)
        navigate(path)
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
      <Link to={'/browse'}>
        <img src="/alpha.png" alt="logo" />
      </Link>
      <StyledMenus>
        {menus.map(item => (
              <Link to={item.path} key={item.name} 
              onClick={() => handlePageClick(item.path)} 
              style={{fontWeight: page === item.path ? 'bold' : 'normal'}}>
                <h2>
                  {item.name}
                </h2>
            </Link>
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
            <p key={item.name} onClick={() => handlePageClick(item.path)}
            style={{fontWeight: page === item.path ? 'bold' : 'normal'}}>
                {item.name}
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
