import { useEffect, useRef, useState } from 'react'
import { StyledAngle, StyledCoins, StyledContainer, StyledDeskInput, StyledDeskMenus, StyledLogo, StyledLogout, StyledMobileMenu, StyledSearchIcon, StyledTablet, StyledTabletInput, StyledTabletMenu, StyledTabletTab, StyledUserIcon, StyledUserInfo } from './style'
import { LogoutModal } from '../LogoutModal'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { InterestedCoin } from '../InterestedCoin';
import { RecentCoin } from '../RecentCoin';
import { SearchComponent } from '../SearchComponent';
import { useRecoilState } from 'recoil';
import { userState } from '../../context/userState';
import useGetAssetData from '../../hooks/useGetAssetData';
import useCalculateAsset from '../../hooks/useCalculateAsset';
import useLogout from '../../hooks/useLogout';



const NavbarComponent = () => {
    const [page, setPage] = useState<string>('/browse');
    const location = useLocation();
    const [logoutModal, setLogoutModal] = useState<boolean>(false);
    const [info, setInfo] = useState<boolean>(false);
    const [burgerTab, setBurgerTab] = useState<boolean>(false);
    const [searchModal, setSearchModal] = useState<boolean>(false)
    const [interestedCoin, setInterestedCoin] = useState<boolean>(false)
    const [recentCoin, setRecentCoin] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);


    const [user, setUser] = useRecoilState(userState);

    const {data} = useGetAssetData()
    const calculatedData = useCalculateAsset(data)

    const {mutate: logoutMutate} = useLogout()

    const {
        // *총 자산
        totalAssets,
        // * 평가손익
        totalProfitLoss,
        //*보유 현금
        availableOrder
    } =  calculatedData || {};


  const handleSearchModalClose = () => {
    setSearchModal(false)
  }


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


    const handleClickSearch = () => {
        setSearchModal(prev => !prev)
    }

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSearchModal(false);
            }
        };

        document.addEventListener('keydown', handleKeydown);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, []);
    
    
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth]);

    const handleOutsideClick =() => {
        setInterestedCoin(false)
        setRecentCoin(false)
    }

    const handleInterstedClick = () => {
        setInterestedCoin(true)
    }

    const handleRecentClick = () => {
        setRecentCoin(true)
    }


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
        setInfo(false)
        e.stopPropagation();
    }

    const handleLogout = () => {
        logoutMutate()
        localStorage.removeItem('user')
        localStorage.removeItem('asset')
        setUser(null)

        Object.keys(localStorage).forEach((key) => {
            if(key.startsWith('kakao')){
                localStorage.removeItem(key)
            }
        })

        setLogoutModal(false);
        navigate('/')
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
        <StyledContainer className='nabar'>

            <StyledLogo>
                <Link to={'/browse'}>
                    <img src="/alpha.png" alt="logo" onClick={() => handlePageClick('/browse')} />
                </Link>
            </StyledLogo>


            {/* //*데스크탑 (730 ~ 1024px) */}
            {windowWidth >= 730 && (
                <>
                    <StyledDeskMenus>
                        {menus.map(item => (
                            <Link to={item.path} key={item.name} onClick={() => handlePageClick(item.path)}
                                style={{ fontWeight: page === item.path ? 'bold' : 'normal' }}>
                                <h3>{item.name}</h3>
                            </Link>
                        ))}
                        <StyledDeskInput>
                            <p onClick={handleClickSearch}>코인을 검색하세요</p>
                        </StyledDeskInput>
                    </StyledDeskMenus>
                    <StyledUserIcon onClick={handleUserClick} ref={iconRef}>
                        <img src="/user.png" alt="userIcon" />
                    </StyledUserIcon>
                </>
            )}

            {/* //*테블릿 (630 ~ 730px) */}
            {windowWidth >= 630 && windowWidth < 730 && (
                <>
                    <StyledTablet>
                        <StyledTabletInput>   
                            <p onClick={handleClickSearch}>코인을 검색하세요</p>
                        </StyledTabletInput>
                        <StyledTabletTab onClick={handleBurgerClick} ref={tabRef}>
                            <FontAwesomeIcon icon={faBars} size="2xl" />
                        </StyledTabletTab>
                    </StyledTablet>
                    <StyledUserIcon onClick={handleUserClick} ref={iconRef}>
                        <img src="/user.png" alt="userIcon" />
                    </StyledUserIcon>

                    {burgerTab && (
                        <StyledTabletMenu ref={tabMenuRef}>
                            {menus.map(item => (
                                <Link to={item.path} key={item.name} onClick={() => handlePageClick(item.path)}
                                    style={{
                                        fontWeight: page === item.path ? 'bold' : 'normal',
                                        color: page === item.path ? 'red' : 'black'
                                    }}>
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
                    <h1 className='font-bold text-center pb-2'>Welcome {user.name}</h1>
                    <p><strong>보유 현금</strong> <span>{Math.round(availableOrder)?.toLocaleString()}</span></p>
                    <p><strong>보유 자산</strong> <span>{Math.round(totalAssets)?.toLocaleString()}</span></p>
                    <p><strong>평가 손익</strong> 
                        <span className={`${totalProfitLoss > 0 ? 'text-red-500' : 'text-blue-600'}`}>{totalProfitLoss > 0 && '+'}{Math.round(totalProfitLoss)?.toLocaleString()}</span>
                    </p>
                    <hr />
                    <StyledCoins>
                        <span onClick={handleInterstedClick}>관심 코인</span>
                        <span onClick={handleRecentClick}>최근 본 코인</span>
                    </StyledCoins>
                    <hr />
                    <StyledLogout onClick={handleLogoutClick}>
                        <p>로그아웃</p>
                    </StyledLogout>
                    { interestedCoin && <InterestedCoin handleOutsideClick={handleOutsideClick}/>}
                    { recentCoin && <RecentCoin handleOutsideClick={handleOutsideClick}/>}
                </StyledUserInfo>
            )}





            {/* //* 모바일 (630px 이하) */}
            {windowWidth < 630 && (
                <>     
                    <StyledSearchIcon onClick={handleClickSearch}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size='2xl' />
                    </StyledSearchIcon>

                    <StyledUserIcon onClick={handleUserClick} ref={iconRef}>
                        <img src="/user.png" alt="userIcon" />
                    </StyledUserIcon>


                    <StyledMobileMenu>
                        {menus.map(item => (
                            <Link to={item.path} key={item.name} onClick={() => handlePageClick(item.path)}
                                style={{
                                    fontWeight: page === item.path ? 'bold' : 'normal',
                                    color: page === item.path ? 'black' : 'white'
                                }}
                            >
                                <p>{item.name}</p>
                            </Link>
                        ))}
                    </StyledMobileMenu>
                    
                </>
            )}

            {/* //*검색 모달 */}
            { searchModal &&
                    <div>
                        <SearchComponent handleSearchModalClose={handleSearchModalClose}/>
                    </div>


                    }

            {/* //* 로그아웃 모달 */}
            {logoutModal && <LogoutModal handleLogout={handleLogout} handleCloseModal={handleCloseModal} />}
        </StyledContainer>
    );
};

export default NavbarComponent;
