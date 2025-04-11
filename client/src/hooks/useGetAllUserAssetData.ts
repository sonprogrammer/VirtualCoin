import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// 여기서 userId넣은 이유는 asset데이터가 없을시 서버에서 해당 유저의 assetdata를 만들기 위함 다른 이윤 없음
const getAllUserAsset = async (userId: string) => {
    const res = await axios.get(`http://localhost:3000/api/asset/all-user/${userId}`)
    return res.data
}


const  useGetAllUserAssetData = (userId: string) => {
    return useQuery({
        queryKey: ['allUser', userId],
        queryFn: () => getAllUserAsset(userId)
    })
}

export default useGetAllUserAssetData