import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetRankData = () => {

    const fetchRanking = async () => {
        const res = await axios.get('http://localhost:3000/api/user/rank')
        console.log('res', res.data)
        return res.data
        
    }

    const { data: rankingData } = useQuery({
        queryKey: ['rankingData'],
        queryFn: fetchRanking
    })

    return { rankingData}
}

export default useGetRankData