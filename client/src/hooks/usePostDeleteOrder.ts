import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "./auth/useGetRefresh"
import { useRecoilValue } from "recoil"
import { userState } from "../context/userState"





const deleteOrder = async(orderId: string[]) => {
    const res = await axiosInstance.post(`/holding/pending-delete`,{
        orderId
    })
    return res.data
}


const usePostDeleteOrder = () => {
    const queryClient = useQueryClient();
    const user = useRecoilValue(userState)
    return useMutation({
        mutationFn: deleteOrder,
        onSuccess: () => {
            const userId = user?._id
            queryClient.invalidateQueries({queryKey: ["pendingCoins", userId]})
            queryClient.invalidateQueries({queryKey: ["asset", userId]})
        },
        onError: (error) => {
            console.log('미체결 삭제 실패', error)
        }
    })
}

export default usePostDeleteOrder