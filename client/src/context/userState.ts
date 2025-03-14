import { atom } from "recoil";
import { getUserFromLocalStorage } from "./localStorage";

const user = getUserFromLocalStorage()


export const userState = atom({
    key: 'userState',
    default: user ? user : 
    {
        _id: null,
        name: "",
        isGuest: false,
        totalAssets: 0,
        totalCash: 0,
        availableBalance: 0, // 사용 가능 잔액
        holdings: [], // 보유 자산
        transactions: [], // 거래 내역
        interestedCoins: [], // 관심 코인
        recentCoins: [], // 최근 조회 코인
        sessionExpires: null, // 세션 만료 정보 (추후 사용 가능)
        createdAt: "",
        updatedAt: "",
    }
})