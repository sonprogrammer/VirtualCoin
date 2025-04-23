import { useRecoilValue } from "recoil"
import { userState } from "../context/userState"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "./useGetRefresh"



const useGetLikedCoins = () => {
    const userData = useRecoilValue(userState)

    const fetchLikedCoins = async() => {
        if(userData.isGuest){
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
            return storedUser.interestedCoins || []
        }else{
            const res = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/user/liked-coins`)
            return res.data.likedCoins
        }
    }

       

    const { data: likedCoins, isLoading, isError} = useQuery({
        queryKey: ['likedCoins', userData.isGuest],
        queryFn: fetchLikedCoins,
    })

    return { likedCoins, isLoading, isError}
}

export default useGetLikedCoins