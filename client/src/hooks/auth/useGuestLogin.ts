import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { accessTokenState, userState } from '../../context/userState';
import axiosInstance from './useGetRefresh';





const guestLogin = async () => {
    const res = await axiosInstance.post('/user/guest-login')
    return res.data
}


const useGuestLogin = () => {
    const [user, setUser] = useRecoilState(userState)
    const queryClient = useQueryClient()
    const setAccessToken = useSetRecoilState(accessTokenState)

    const loginMutation = useMutation({
        mutationFn: guestLogin,
        onSuccess: (data) => {
            setUser(data.user)

            if (data.token) {
                setAccessToken(data.token)
            }

            queryClient.invalidateQueries({ queryKey: ['guestUser'] })
        },
        onError: (error) => {
            console.error('게스트 로그인 오류 ', error);
        }
    })


    return { user, login: loginMutation.mutate }

}


export default useGuestLogin
