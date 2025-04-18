import { useQuery } from "@tanstack/react-query"
import axios from "axios"


const getTransaction = async(userId: string) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/transaction/${userId}`)
    return res.data.transaction
}

const useGetTransaction = (userId: string) => {
    return useQuery({
        queryKey: ['transactions', userId],
        queryFn: () => getTransaction(userId)
    })
}

export default useGetTransaction