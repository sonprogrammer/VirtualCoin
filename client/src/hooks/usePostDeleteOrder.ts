import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"




const deleteOrder = async(userId: string, orderId: string[]) => {
    const res = await axios.post(`http://localhost:3000/api/holding/pending-delete/${userId}`,{
        orderId
    })
    console.log('res', res.data)
    return res.data
}


const usePostDeleteOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({userId, orderId}: {userId: string; orderId: string[]}) => {
            return deleteOrder(userId, orderId)
        },
        onSuccess: async(data, variable) => {
            const userId = variable.userId
            await queryClient.invalidateQueries({queryKey: ["pendingCoins", userId]})
            await queryClient.refetchQueries({ queryKey: ['pendingCoins', userId] });
            console.log('미체결 내용 삭제 성공', data)
        },
        onError: (error) => {
            console.log('미체결 삭제 실패', error)
        }
    })
}

export default usePostDeleteOrder