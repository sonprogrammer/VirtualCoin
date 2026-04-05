import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../context/userState';
import { saveAccessToken } from '../context/saveAccessToken';
import { toast } from 'react-toastify';
import axiosInstance from './useGetRefresh';




const guestLogin = async() => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/guest-login`)
    // const res = await axiosInstance.post('/api/user/guest-login')
    console.log('rea datae', res.data)
    return res.data
}

const useGuestLogin = () => {
    const [user, setUser] = useRecoilState(userState)
    const queryClient = useQueryClient()

    const loginMutation = useMutation({
        mutationFn: guestLogin,
        onSuccess: (data) => {
            if (data) {
                console.log('data from useguestloing ', data)
                localStorage.setItem('user', JSON.stringify(data))
                console.log('2. 로컬스토리지 확인:', localStorage.getItem('user'))
                // saveAccessToken(data)
                setUser(data)
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
