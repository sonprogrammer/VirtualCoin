import { useEffect, useRef, useState } from 'react'
import { StyledAngle, StyledContainer, StyledDeskInput, StyledDeskMenus, StyledLogo, StyledLogout, StyledMobileMenu, StyledSearchIcon, StyledTablet, StyledTabletInput, StyledTabletMenu, StyledTabletTab, StyledUserIcon, StyledUserInfo } from './style'
import { LogoutModal } from '../LogoutModal'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const NavbarComponent = () => {
    const [page, setPage] = useState<string>('/browse');
    const location = useLocation();
    const [logoutModal, setLogoutModal] = useState<boolean>(false);
    const [info, setInfo ] = useState<boolean>(false);
    const [burgerTab, setBurgerTab] = useState<boolean>(false);
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth); // 윈도우 크기 상태 추가

    const userRef = useRef<HTMLDivElement | null>(null);
    const iconRef = useRef<HTMLDivElement | null>(null);
    const tabRef = useRef<HTMLDivElement | null>(null);
    const tabMenuRef = useRef<HTMLDivElement | null>(null);

    const navigate = useNavigate();

    const menus = [
        { name: '거래소', path: '/browse' },
        { name: '투자내역', path: '/asset' },
        { name: '랭킹', path: '/rank' },
    ];

    useEffect(() => {
      setPage(location.pathname); 
  }, [location.pathname]);


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleBurgerClick = () => {
        setBurgerTab(!burgerTab);
    }

    const handlePageClick = (path: string) => {
        setPage(path);
        navigate(path);
    }

    const handleUserClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setInfo(!info);
    }

    const handleLogoutClick = (e: React.MouseEvent) => {
        setLogoutModal(true);
        e.stopPropagation();
    }

    const handleLogout = () => {
        // TODO: 백엔드 로그아웃 처리
        setLogoutModal(false);
    }

    const handleCloseModal = () => {
        setLogoutModal(false);
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (userRef.current && !userRef.current.contains(e.target as Node) && iconRef.current && !iconRef.current.contains(e.target as Node)) {
                setInfo(false);
            }
            if (tabRef.current && !tabRef.current.contains(e.target as Node) && tabMenuRef.current && !tabMenuRef.current.contains(e.target as Node)) {
                setBurgerTab(false);
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
                    <img src="/alpha.png" alt="logo" onClick={() => handlePageClick('/browse')} />
                </Link>
            </StyledLogo>

            {/* //*데스크탑 (730 ~ 1024px) */}
            {windowWidth >= 730  && (
              <>
                <StyledDeskMenus>
                    {menus.map(item => (
                        <Link to={item.path} key={item.name} onClick={() => handlePageClick(item.path)} 
                        style={{ fontWeight: page === item.path ? 'bold' : 'normal' }}>
                            <h2>{item.name}</h2>
                        </Link>
                    ))}
                    <StyledDeskInput>
                        <input type="text" placeholder="코인을 검색하세요" />
                    </StyledDeskInput>
                </StyledDeskMenus>
                <StyledUserIcon onClick={handleUserClick} ref={iconRef}>
                  <img src="./user.png" alt="userIcon" />
                </StyledUserIcon>
              </>
            )}
            
            {/* //*테블릿 (630 ~ 730px) */}
            {windowWidth >= 630 && windowWidth < 730 && (
              <>
                <StyledTablet>
                    <StyledTabletInput>
                        <input type="text" placeholder="코인을 검색하세요" />
                    </StyledTabletInput>
                    <StyledTabletTab onClick={handleBurgerClick} ref={tabRef}>
                        <FontAwesomeIcon icon={faBars} size="2xl" />
                    </StyledTabletTab>
                </StyledTablet>
                <StyledUserIcon onClick={handleUserClick} ref={iconRef}>
                  <img src="./user.png" alt="userIcon" />
                </StyledUserIcon>
                {burgerTab && (
                    <StyledTabletMenu ref={tabMenuRef}>
                        {menus.map(item => (
                            <Link to={item.path} key={item.name} onClick={() => handlePageClick(item.path)} 
                            style={{ fontWeight: page === item.path ? 'bold' : 'normal', 
                                    color: page === item.path ? 'red' : 'black' }}>
                                <p>{item.name}</p>
                            </Link>
                        ))}
                    </StyledTabletMenu>
                )}
                </>
                
            )}

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

            


             {/* //* 모바일 (630px 이하) */}
             {windowWidth < 630 && (
              <>
                <StyledSearchIcon>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size='2xl' />
                </StyledSearchIcon>
                <StyledMobileMenu>
                {menus.map(item => (
                        <Link to={item.path} key={item.name} onClick={() => handlePageClick(item.path)} 
                        style={{ fontWeight: page === item.path ? 'bold' : 'normal',
                                color: page === item.path ? 'black' : 'white' }}
                        >
                            <p>{item.name}</p>
                        </Link>
                    ))}
                </StyledMobileMenu>
                    <StyledUserIcon onClick={handleUserClick} ref={iconRef}>
                      <img src="./user.png" alt="userIcon" />
                    </StyledUserIcon>
              </>
            )}

            {/* //* 로그아웃 모달 */}
            {logoutModal && <LogoutModal handleLogout={handleLogout} handleCloseModal={handleCloseModal} />}
        </StyledContainer>
    );
};

export default NavbarComponent;
