import { useQuery } from "@tanstack/react-query"
import axios from "axios"


const getTransaction = async(userId:string) => {
    const res = await axios.get(`http://localhost:3000/api/holding/all-transaction/${userId}`)

    return res.data
}


const useGetAllTransaction = (userId: string) => {
    return useQuery({
        queryKey: ['allTransaction', userId],
        queryFn: () => getTransaction(userId)
    })
}

export default useGetAllTransaction