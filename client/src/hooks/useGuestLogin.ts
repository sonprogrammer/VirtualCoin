import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';


const guestUser = 'guestUser'



//*로컬스토리지에서 조회, 없으면 생성 - 서버에서 랜덤 닉네임 받아옴 -> 서버에서 중복이름 걸러줌
const fetchGuest = async(): Promise<string> => {
    const StoredGuest = localStorage.getItem(guestUser)

    if(StoredGuest) return StoredGuest

    //TODO api만들어야함 여기서 랜덤 이름지어주어야함
    const res = await axios.post('http://localhost:3000/api/user/guest-login')
    console.log('res', res)
    // http://localhost:3000/api/user/guestLogin
    const guestNickName = res.data.nickName
    localStorage.setItem(guestUser, guestNickName)
    return guestNickName
}

const logoutGuest = async () => {
    localStorage.removeItem(guestUser)
}

const useGuestLogin = () => {
    const { data: guestNickName, isLoading, isError, refetch } = useQuery({
        queryKey: ['guestNickName'],
        queryFn: fetchGuest,
        staleTime: Infinity, 
    });

    const { mutate: handleLogout } = useMutation({
        mutationFn: logoutGuest,
        onSuccess: () => {
            localStorage.removeItem(guestUser);
        },
    });

    return {
        guestNickName,
        isLoading,
        isError,
        handleLogout,
        refetch,
    };

}

export default useGuestLogin
