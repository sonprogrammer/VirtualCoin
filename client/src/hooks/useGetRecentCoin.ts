import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../context/userState";


// !카카오유저는 서버에 최대 10개만 보여주자
// !게스트유저는 로컬스토리지에 최대 10개만 저장

const getRecentCoin = async() => {
    const res = await axios.get('http://localhost:3000/api/user/recentCoin',
        { withCredentials: true }
    )
    return res.data.recentCoins
}

const useGetRecentCoin = () => {
    const userData = useRecoilValue(userState)

    if(!userData.isGuest){
        return useQuery({
            queryKey: ['recentCoin'],
            queryFn: getRecentCoin,
        })
    }else{
        const guestUser = JSON.parse(localStorage.getItem('user') || '{}')
        return { data: guestUser.recentCoins};

    }
}

export default useGetRecentCoin