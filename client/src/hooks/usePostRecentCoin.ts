import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { userState } from '../context/userState';
import axiosInstance from './auth/useGetRefresh';



const postRecentCoin = async (coinId: string) => {
    const res = await axiosInstance.post(`/user/${coinId}/recentCoin`)
    return res.data
}


const usePostRecentCoin = () => {
    const userData = useRecoilValue(userState)
    const queryClient = useQueryClient()    
    return useMutation({
        mutationFn: postRecentCoin,
        onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['recentCoin', userData?._id] })
        },
        onError: (error) => {
            console.error('Failed to update recent coin:', error);
        }
    })
}

export default usePostRecentCoin
