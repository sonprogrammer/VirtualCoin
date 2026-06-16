import { useEffect, useMemo, useRef, useState } from "react";
import { useWindowWidth } from "./useWindowWidth";
import { useLocation, useNavigate } from "react-router-dom";

export const useNavBarState = () => {
    const [page, setPage] = useState<string>('/browse');
    const [logoutModal, setLogoutModal] = useState(false);
    const [info, setInfo] = useState(false);
    const [burgerTab, setBurgerTab] = useState(false);
    const [searchModal, setSearchModal] = useState(false);
    const [interestedCoin, setInterestedCoin] = useState(false);
    const [recentCoin, setRecentCoin] = useState(false);
    const windowWidth = useWindowWidth(); // 이전에 만든 훅

    const userRef = useRef<HTMLDivElement | null>(null);
    const iconRef = useRef<HTMLDivElement | null>(null);
    const tabRef = useRef<HTMLDivElement | null>(null);
    const tabMenuRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => setPage(location.pathname), [location.pathname])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    // 1. 모달 배경을 클릭했으면 아예 아무것도 하지 않음 (모달 내부 로직에 맡김)
    if (target.closest('.modal-overlay')) {
        return;
    }

    // 2. 기존 유저 인포 닫기 로직
    if (userRef.current && !userRef.current.contains(e.target as Node) && 
        iconRef.current && !iconRef.current.contains(e.target as Node)) {
        setInfo(false);
    }
    
    // 3. 기존 버거 메뉴 닫기 로직
    if (tabRef.current && !tabRef.current.contains(e.target as Node) && 
        tabMenuRef.current && !tabMenuRef.current.contains(e.target as Node)) {
        setBurgerTab(false);
    }
};
        // const handleClickOutside = (e: MouseEvent) => {
        //     if (userRef.current && !userRef.current.contains(e.target as Node) && 
        //         iconRef.current && !iconRef.current.contains(e.target as Node)) {
        //         setInfo(false);
        //     }
        //     if (tabRef.current && !tabRef.current.contains(e.target as Node) && 
        //         tabMenuRef.current && !tabMenuRef.current.contains(e.target as Node)) {
        //         setBurgerTab(false);
        //     }
        // };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])
    
    return useMemo(() => ({
        page, setPage, logoutModal, setLogoutModal, info, setInfo, 
        burgerTab, setBurgerTab, searchModal, setSearchModal, 
        interestedCoin, setInterestedCoin, recentCoin, setRecentCoin,
        windowWidth, userRef, iconRef, tabRef, tabMenuRef, navigate
    }), [page, logoutModal, info, burgerTab, searchModal, interestedCoin, recentCoin, windowWidth, navigate]);
}