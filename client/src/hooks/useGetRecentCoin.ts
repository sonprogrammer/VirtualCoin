import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { userState } from "../context/userState";
import axiosInstance from "./useGetRefresh";


// !카카오유저는 서버에 최대 10개만 보여주자
// !게스트유저는 로컬스토리지에 최대 10개만 저장
interface RecentData {
    recentCoins: string[]
}

const getRecentCoin = async (): Promise<string[]> => {
    const res = await axiosInstance.get<RecentData>(`/api/user/recentCoin`)
    return res.data.recentCoins
}

const useGetRecentCoin = () => {
    const userData = useRecoilValue(userState)

    const getGuestCoins = () => {
        const guestUser = JSON.parse(localStorage.getItem('user') || '{}');
        return guestUser.recentCoins || [];
    };

    return useQuery({
        queryKey: ['recentCoin', userData._id],
        queryFn: async() => {
            if(userData.isGuest) return getGuestCoins()
            return await getRecentCoin()
        },
        enabled: userData !== null,
        staleTime: userData.isGuest ? 0 : 1000 * 60 * 5
    })
}


export default useGetRecentCoin