import { useEffect, useRef, useState } from 'react'
import { StyledAngle, StyledContainer, StyledLogo, StyledLogout, StyledMenus, StyledMobileMenu, StyledUserIcon, StyledUserInfo } from './style'
import { LogoutModal } from '../LogoutModal'
import { Link, useNavigate } from 'react-router-dom'


const NavbarComponent = () => {
    const [page, setPage] = useState<string>('')
    const userRef = useRef<HTMLDivElement | null>(null)
    const iconRef = useRef<HTMLDivElement | null>(null)
    const [logoutModal, setLogoutModal] = useState<boolean>(false)
    const [info, setInfo ] = useState<boolean>(false)

    const navigate = useNavigate()
    
    const menus = [
      { name: '거래소', path: '/market' },
      { name: '투자내역', path: '/asset' },
      { name: '랭킹', path: '/bank' },
  ];

   const handlePageClick = (path: string) => {
        setPage(path)
        navigate(path)
   }

   const handleUserClick = (e:React.MouseEvent) => {
    e.stopPropagation()
    setInfo(!info);
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
      if (userRef.current && !userRef.current.contains(e.target as Node) && iconRef.current && !iconRef.current.contains(e.target as Node)) {
        setInfo(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
   
    
  return (
    <StyledContainer>
      <StyledLogo>

      <Link to={'/browse'}>
        <img src="/alpha.png" alt="logo" />
      </Link>
      </StyledLogo>
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
        <input type="text" placeholder='코인을 검색하세요' />
      </StyledMenus>

<>

      <StyledUserIcon onClick={handleUserClick} ref={iconRef}>
        <img src="./user.png" alt="userIcon" />
      </StyledUserIcon>

      {info && (
        <StyledUserInfo ref={userRef}>
                    <StyledAngle />
                    <p><strong>보유 현금</strong> <span>10,000,000</span></p>
                    <p><strong>총 평가 손익</strong> <span style={{ color: 'red' }}>+3,000,000</span></p>
                    <hr />
                    <p><span>관심 코인</span> <span>최근 본 코인</span></p>
                    <hr />
                    <StyledLogout onClick={handleLogoutClick}>
                      <p>로그아웃</p>
                    </StyledLogout>
                </StyledUserInfo>
            )}
            </>

      
          {/* 모바일 크기일때는 네브바가 아래쪽으로 이동 */}
      {/* <StyledBurgerMenu ref={burgerRef} onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={isOpen ? faXmark : faBars} size="2x" />
      </StyledBurgerMenu> */}
    {/* {isOpen &&
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
    } */}

    {logoutModal && <LogoutModal handleLogout={handleLogout}  handleCloseModal={handleCloseModal}/>}


    </StyledContainer>
  )
}

export default NavbarComponent
