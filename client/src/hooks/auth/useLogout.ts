import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { accessTokenState, userState } from "../../context/userState";

const logout = async() => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/logout`,{}, {withCredentials:true})
    return res.data
}

const useLogout = () => {
    const queryClient = useQueryClient()
    const setAccessToken = useSetRecoilState(accessTokenState)
    const setUser = useSetRecoilState(userState)
    const navigate=useNavigate()
    
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            setAccessToken(null)
            setUser(null)
            queryClient.clear()
            navigate('/',{replace: true})
        },
        onError: (err) => {
            console.error('logout failsed', err)
            toast.error('로그아웃 실패')
        }
    })
}

export default useLogout