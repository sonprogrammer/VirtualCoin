import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { userState } from '../context/userState';
import axiosInstance from './useGetRefresh';


const postRecentCoin = async (coinId: string) => {
    const res = await axiosInstance.post(`/api/user/${coinId}/recentCoin`)
    return res.data
}


const usePostRecentCoin = () => {
    const userData = useRecoilValue(userState)
    const queryClient = useQueryClient()    
    return useMutation({
        mutationFn: (coinId: string) => {
            if (!userData.isGuest) {
                return postRecentCoin(coinId)
            } else {

                const guestData = JSON.parse(localStorage.getItem('user') || '{}');
          

                if(guestData && guestData.isGuest){
                    const recentCoins = guestData.recentCoins || []
                    const updatedCoins = [coinId, ...recentCoins.filter((id: string) => id !== coinId)].slice(0, 10);
                    const updatedGuestData = {...guestData, recentCoins: updatedCoins}
                    localStorage.setItem('user', JSON.stringify(updatedGuestData))
                    return Promise.resolve(updatedGuestData); 
                }else{
                    return Promise.reject(new Error('gues data is not availavle'))
                }

            }
        },
        onSuccess: () => {
            if (!userData.isGuest) {
                queryClient.invalidateQueries({ queryKey: ['recentCoin', userData._id] });
            } else {
                queryClient.setQueryData(['recentCoin'], (_old: string[] = []) => {
                    const guestData = JSON.parse(localStorage.getItem('user') || '{}');
                    return guestData.recentCoins || [];
                });
            }
        },
        onError: (error) => {
            console.error('Failed to update recent coin:', error);
        }
    })
}

export default usePostRecentCoin
