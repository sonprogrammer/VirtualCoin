import { useEffect, useMemo } from 'react'
import { StyledContainer, StyledLogo, StyledSearchIcon, StyledTabletMenu, StyledUserIcon } from './style'
import { LogoutModal } from '../LogoutModal'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { InterestedCoin } from '../InterestedCoin';
import { RecentCoin } from '../RecentCoin';
import { SearchComponent } from '../SearchComponent';
import { useRecoilState } from 'recoil';
import { userState } from '../../context/userState';
import useLogout from '../../hooks/useLogout';
import { DesktopMenu } from './DesktopMenu';
import { TabletMenu } from './TabletMenu';
import { MobileMenu } from './MobileMenu';
import { UserInfo } from './UserInfo';
import { useNavBarState } from '../../hooks/useNavBarState';



const NavbarComponent = () => {
    const { 
        page, windowWidth, searchModal, info, burgerTab, interestedCoin, recentCoin,logoutModal,
        userRef, iconRef, tabRef, tabMenuRef, setPage,
        setSearchModal, setInfo, setBurgerTab, setInterestedCoin, setRecentCoin, setLogoutModal
    } = useNavBarState()


    const [user, setUser] = useRecoilState(userState);

   
    const { mutate: logoutMutate } = useLogout()



    const handleSearchModalClose = () => {
        setSearchModal(false)
    }


    const navigate = useNavigate();

    const menus = useMemo(() => [
        { name: '거래소', path: '/browse' },
        { name: '투자내역', path: '/asset' },
        { name: '랭킹', path: '/rank' },
    ],[]);


    const handleClickSearch = () => {
        setSearchModal((prev:boolean) => !prev)
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


    const handlePageClick = (path: string) => {
        setPage(path);
        navigate(path);
    }

    const handleUserClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setInfo((prev:boolean) => !prev);
    }

    const handleLogoutClick = (e: React.MouseEvent) => {
        setLogoutModal(true);
        setInfo(false)
        e.stopPropagation();
    }

    const handleLogout = () => {
        logoutMutate()
        localStorage.clear()
        setUser(null)
        setLogoutModal(false);
        navigate('/')
    }

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
                    <DesktopMenu
                        menus={menus}
                        page={page}
                        onPageClick={handlePageClick}
                        onSearchClick={() => setSearchModal(true)}
                    />
                    <StyledUserIcon onClick={handleUserClick} ref={iconRef}>
                        <img src="/user.png" alt="userIcon" />
                    </StyledUserIcon>
                </>
            )}

            {/* //*테블릿 (630 ~ 730px) */}
            {windowWidth >= 630 && windowWidth < 730 && (
                <>
                    <TabletMenu
                        onSearchClick={() => setSearchModal(true)}
                        onBurgerClick={() => setBurgerTab((prev:boolean) => !prev)}
                        tabRef={tabRef}
                    />
                    <StyledUserIcon onClick={handleUserClick} ref={iconRef}>
                        <img src="/user.png" alt="userIcon" />
                    </StyledUserIcon>

                    {burgerTab && (
                        <StyledTabletMenu ref={tabMenuRef}>
                            {menus.map(item => (
                                <Link to={item.path} key={item.name} onClick={() => handlePageClick(item.path)}
                                    style={{
                                        fontWeight: page === item.path ? 'bold' : 'normal',
                                        color: page === item.path ? '#ef4444' : '#d4d4d8'
                                    }}>
                                    <p>{item.name}</p>
                                </Link>
                            ))}
                        </StyledTabletMenu>
                    )}
                </>

            )}

            {info && (
                <UserInfo
                    userName={user.name}
                    onLogoutClick={handleLogoutClick}
                    onInterestedClick={() => setInterestedCoin(true)}
                    onRecentClick={() => setRecentCoin(true)}
                    userRef={userRef}
                />
            )}


            {/* //* 모바일 (630px 이하) */}
            {windowWidth < 630 && (
                <>
                    <StyledSearchIcon onClick={handleClickSearch}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size='xl' />
                    </StyledSearchIcon>

                    <StyledUserIcon onClick={handleUserClick} ref={iconRef}>
                        <img src="/user.png" alt="userIcon" />
                    </StyledUserIcon>

                    <MobileMenu
                        menus={menus}
                        page={page}
                        onPageClick={handlePageClick}
                    />
                </>
            )}

            {/* //*검색 모달 */}
            {searchModal &&
                <div>
                    <SearchComponent handleSearchModalClose={handleSearchModalClose} />
                </div>
            }
            {interestedCoin && <InterestedCoin onClose={() => setInterestedCoin(false) } />}
            {recentCoin && <RecentCoin onClose={() => setRecentCoin(false)} />}

            {/* //* 로그아웃 모달 */}
            {logoutModal && <LogoutModal handleLogout={handleLogout} handleCloseModal={() => setLogoutModal(false)} />}
        </StyledContainer>
    );
};

export default NavbarComponent;

