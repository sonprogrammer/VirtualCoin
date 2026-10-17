import { useRecoilValue } from "recoil"
import { userState } from "../context/userState"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "./auth/useGetRefresh"





const useGetLikedCoins = () => {
    const userData = useRecoilValue(userState)

    const fetchLikedCoins = async () => {
        const res = await axiosInstance.get(`/user/liked-coins`)
        return res.data.likedCoins

    }



    const { data: likedCoins, isLoading, isError } = useQuery({
        queryKey: ['likedCoins', userData?._id],
        queryFn: fetchLikedCoins,
        enabled: !!userData?._id
    })

    return { likedCoins, isLoading, isError }
}

export default useGetLikedCoins