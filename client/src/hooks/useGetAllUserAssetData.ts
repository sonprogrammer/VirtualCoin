import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./useGetRefresh";


interface UserCoins {
    amount: number;
    avgBuyPrice: number;
    market: string;
    name: string
}

interface UserInfo {
    _id: string;
    name: string;
}

interface UserAsset {
    _id: string;
    cash: number;
    coins: UserCoins[]
    userId: UserInfo
}
interface AllUserAssetRespons {
    message: string;
    allUser: UserAsset[]
}


// 여기서 userId넣은 이유는 asset데이터가 없을시 서버에서 해당 유저의 assetdata를 만들기 위함 다른 이윤 없음
const getAllUserAsset = async (userId: string): Promise<UserAsset[]> => {
    const res = await axiosInstance.get<AllUserAssetRespons>(`${import.meta.env.VITE_API_URL}/api/asset/all-user/${userId}`)
    console.log('res.dat', res.data)
    return res.data.allUser
}


const useGetAllUserAssetData = (userId: string) => {
    return useQuery({
        queryKey: ['allUser', userId],
        queryFn: () => getAllUserAsset(userId)
    })
}

export default useGetAllUserAssetData