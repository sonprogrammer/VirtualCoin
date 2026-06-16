import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { userState } from '../context/userState';
import axiosInstance from './useGetRefresh';
import { saveUserToLocalStorage } from '../context/localStorage';
import { saveAccessToken } from '../context/saveAccessToken';





const guestLogin = async() => {
    const res = await axiosInstance.post('/api/user/guest-login')
    return res.data
}

const useGuestLogin = () => {
    const [user, setUser] = useRecoilState(userState)
    const queryClient = useQueryClient()

    const loginMutation = useMutation({
        mutationFn: guestLogin,
        onSuccess: (data) => {
            if (data) {
                saveUserToLocalStorage(data.user)
                saveAccessToken(data.token)
                setUser(data.user)
                queryClient.invalidateQueries({ queryKey: ['guestUser'] });
            }
        },
        onError: (error) => {
            console.error('로그인 훅 에러:', error);
        }
    })

    const logoutMutation = useMutation({
        mutationFn: async() => {
            localStorage.clear()
        },
        onSuccess: () => {
            setUser(null)
            queryClient.clear()
        }
    })
    const restoreSession = () =>{
        const stored = localStorage.getItem('user')
        if(stored && !user){
            setUser(JSON.parse(stored))
        }
    }

    return{ user, login: loginMutation.mutate, logout: logoutMutation.mutate, restoreSession}

}


export default useGuestLogin
