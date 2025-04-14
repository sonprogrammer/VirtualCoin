import { useQuery } from "@tanstack/react-query"
import axios from "axios"


const getPendingCoins = async(userId: string) => {
    const res = await axios.get(`http://localhost:3000/api/holding/pending/${userId}`)
    return res.data
}


const useGetPendingCoins = (userId: string) => {
    return useQuery({
        queryKey: ['pendingCoins', userId],
        queryFn: () => getPendingCoins(userId)
    })
}

export default useGetPendingCoins