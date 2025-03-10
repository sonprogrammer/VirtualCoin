import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../context/userState';
import { useEffect } from 'react';


const guestUser = 'guestUser'



//*로컬스토리지에서 조회, 없으면 생성 - 서버에서 랜덤 닉네임 받아옴 -> 서버에서 중복이름 걸러줌
const fetchGuest = async(): Promise<any> => {
    const StoredGuest = localStorage.getItem(guestUser)

    if(StoredGuest) return JSON.parse(StoredGuest)

    try {
        //TODO api만들어야함 여기서 랜덤 이름지어주어야함
        const res = await axios.post('http://localhost:3000/api/user/guest-login')
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
