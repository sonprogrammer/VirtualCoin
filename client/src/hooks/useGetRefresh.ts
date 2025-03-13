import axios from 'axios';

// 리프레시 토큰을 사용하여 액세스 토큰 갱신
const refreshToken = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/user/refresh', {
            withCredentials: true, // 쿠키 포함
        });
        return response.data.accessToken; // 새로운 액세스 토큰 반환
    } catch (error) {
        console.error("리프레시 토큰 갱신 실패", error);
        return null;
    }
};

// Axios 인터셉터 설정
axios.interceptors.response.use(
    (response) => response,  // 응답이 성공적으로 왔을 때 그대로 응답
    async (error) => {
        const originalRequest = error.config;

        // 액세스 토큰 만료(401 에러) 시 리프레시 토큰으로 새로운 액세스 토큰 요청
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // 무한 재시도를 막기 위한 플래그
            const newAccessToken = await refreshToken();
            if (newAccessToken) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axios(originalRequest); // 실패한 요청 재시도
            }
        }

        return Promise.reject(error);  // 그 외의 오류 처리
    }
);
