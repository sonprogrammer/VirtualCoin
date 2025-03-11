import { useQuery } from "@tanstack/react-query";
import axios from "axios";


// !카카오유저는 서버에 최대 10개만 보여주자
// !게스트유저는 로컬스토리지에 최대 10개만 저장

const getRecentCoin = async() => {
    const res = await axios.get('http://localhost:3000/api/coin/recentCoin')
    return res.data
}

const useGetRecentCoin = (isKakaoUser: boolean) => {
    if(isKakaoUser){

        return useQuery({
            queryKey: ['recentCoin'],
            queryFn: getRecentCoin,
            staleTime: 1000 * 60 * 5, 
        })
    }else{
        const guestUser = JSON.parse(localStorage.getItem('guestUser') || '{}')
        return { data: guestUser.recentCoins};

        // const recentCoins = guestUser.recentCoins || [];

        // console.log('guesuser', guestUser.recentCoins)
        // return recentCoins
    }
}

export default useGetRecentCoin