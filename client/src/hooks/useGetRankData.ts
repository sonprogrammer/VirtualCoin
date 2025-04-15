import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetRankData = () => {

    const fetchRanking = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/rank`)
        return res.data
        
    }

    const { data: rankingData } = useQuery({
        queryKey: ['rankingData'],
        queryFn: fetchRanking
    })

    return { rankingData}
}

export default useGetRankData