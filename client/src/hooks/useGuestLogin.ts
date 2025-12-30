import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../context/userState';
import { saveAccessToken } from '../context/saveAccessToken';
import { toast } from 'react-toastify';




const guestLogin = async() => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/guest-login`)
        console.log('res.data', res.data)
        return res.data
    } catch (error) {
        console.error('게스트 로그인 실패', error)
        toast.error('게스트 로그인 실패')
    }
}

const useGuestLogin = () => {
    const [user, setUser] = useRecoilState(userState)
    const queryClient = useQueryClient()

    const loginMutation = useMutation({
        mutationFn: guestLogin,
        onSuccess: (data) => {
            localStorage.setItem('user', JSON.stringify(data.newGuestUser))
            saveAccessToken(data.token)
            console.log('data', data.newGuestUser)
            setUser(data.newGuestUser)
            queryClient.invalidateQueries({queryKey:['guestUser']})
        },
        onError: (error) => {
            console.log('error')
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
