import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { userState } from "../context/userState";
import axiosInstance from "./auth/useGetRefresh";

interface RecentData {
    recentCoins: string[]
}

const getRecentCoin = async (): Promise<string[]> => {
    const res = await axiosInstance.get<RecentData>(`/user/recentCoin`)
    return res.data.recentCoins
}

const useGetRecentCoin = () => {
    const userData = useRecoilValue(userState)

    return useQuery({
        queryKey: ['recentCoin', userData?._id],
        queryFn: getRecentCoin,
        enabled: !!userData && !!userData._id ,
        staleTime: 1000 * 60 * 30,
        gcTime: 1000 * 60 * 60
    })
}


export default useGetRecentCoin