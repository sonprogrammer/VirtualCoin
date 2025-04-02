import { useQuery } from "@tanstack/react-query"
import axios from "axios"


const getTransaction = async(userId: string) => {
    const res = await axios.get(`http://localhost:3000/api/transaction/${userId}`)
    // console.log('res',res.data)
    return res.data
}

const useGetTransaction = (userId: string) => {
    return useQuery({
        queryKey: ['transactions', userId],
        queryFn: () => getTransaction(userId)
    })
}

export default useGetTransaction