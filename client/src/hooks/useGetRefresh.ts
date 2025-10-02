import axios from 'axios';



const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

// 리프레시 토큰을 사용하여 액세스 토큰 갱신
const refreshToken = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/refresh`, {
            withCredentials: true, // 쿠키 포함
        });
        console.log('resposne', response)
        return response.data.token; // 새로운 액세스 토큰 반환
    } catch (error) {
        console.error("리프레시 토큰 갱신 실패", error);
        return null;
    }
};

// Axios 인터셉터 설정
axiosInstance.interceptors.response.use(
    (response) => response,  // 응답이 성공적으로 왔을 때 그대로 응답
    async (error) => {
        const originalRequest = error.config;

        // 액세스 토큰 만료(401 에러) 시 리프레시 토큰으로 새로운 액세스 토큰 요청
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // 무한 재시도를 막기 위한 플래그
            const newAccessToken = await refreshToken();
            if (newAccessToken) {
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest); // 실패한 요청 재시도
            }else{
                console.log('refresh token faild')
            }
        }

        return Promise.reject(error);  // 그 외의 오류 처리
    }
);

export default axiosInstance
