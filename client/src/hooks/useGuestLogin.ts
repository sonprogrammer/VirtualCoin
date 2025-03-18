import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../context/userState';
import { useEffect } from 'react';


const guestUser = 'user'



//*로컬스토리지에서 조회, 없으면 생성 - 서버에서 랜덤 닉네임 받아옴 -> 서버에서 중복이름 걸러줌
const fetchGuest = async(): Promise<any> => {
    const StoredGuest = localStorage.getItem(guestUser)

    if(StoredGuest) return JSON.parse(StoredGuest)

    try {
        const res = await axios.post('http://localhost:3000/api/user/guest-login')
        const guestUserData = res.data
        //*게스트 유저정보 저장
        localStorage.setItem(guestUser, JSON.stringify(guestUserData));
        // *게스트 자산 정보 버장
        const assetData = {
            name: guestUserData.name,
            cash: 10000000,
            coins: []
        }
        localStorage.setItem('asset', JSON.stringify(assetData))
        return guestUserData
    } catch (error) {
        console.error('게스트 로그인 실패:', error);
        return null;
    }

}

const logoutGuest = async () => {
    localStorage.removeItem(guestUser)
    localStorage.removeItem('asset')
}

const useGuestLogin = () => {
    const [user, setUser] = useRecoilState(userState)

    const { data: guestUserData, isLoading, isError, refetch } = useQuery({
        queryKey: ['guestUser'],
        queryFn: fetchGuest,
        staleTime: Infinity, 
    });

    useEffect(() => {
        if (guestUserData) {
          setUser(guestUserData);
        }
      }, [guestUserData, setUser]);

    const { mutate: handleLogout } = useMutation({
        mutationFn: logoutGuest,
        onSuccess: () => {
            localStorage.removeItem(guestUser);
            localStorage.removeItem('asset');
        },
    });

    return {
        guestUserData,
        isLoading,
        isError,
        handleLogout,
        refetch,
    };

}

export default useGuestLogin
