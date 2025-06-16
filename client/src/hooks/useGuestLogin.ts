import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../context/userState';
import { useEffect } from 'react';


const guestUser = 'user'



const fetchGuest = async(): Promise<any> => {
    const StoredGuest = localStorage.getItem(guestUser)

    if(StoredGuest) return JSON.parse(StoredGuest)

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/guest-login`)
        const guestUserData = res.data
        localStorage.setItem(guestUser, JSON.stringify(guestUserData));
    
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
    const [, setUser] = useRecoilState(userState)

    const { data: guestUserData, isLoading, isError, refetch } = useQuery({
        queryKey: ['guestUser'],
        queryFn: fetchGuest,
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
            setUser(null)
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
