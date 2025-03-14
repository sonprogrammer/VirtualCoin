import { useRecoilValue } from "recoil"
import { userState } from "../context/userState"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"



const useGetLikedCoins = () => {
    const userData = useRecoilValue(userState)

    const fetchLikedCoins = async() => {
        if(userData.isGuest){
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
            return storedUser.interestedCoins || []
        }else{
            const res = await axios.get(`http://localhost:3000/api/user/liked-coins`, {
                withCredentials: true, 
              })
            return res.data.likedCoins
        }
    }

       

    const { data: likedCoins, isLoading, isError} = useQuery({
        queryKey: ['likedCoins', userData.isGuest],
        queryFn: fetchLikedCoins,
        // staleTime: Infinity
    })

    return { likedCoins, isLoading, isError}
}

export default useGetLikedCoins