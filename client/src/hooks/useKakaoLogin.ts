import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { userState } from '../context/userState'; // 유저 상태 관리 Atom

const useKakaoLogin = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState); // 전역 상태 업데이트

  // 🔥 카카오 로그인 성공 시 실행되는 함수
  const handleKakaoSuccess = async (data: any) => {
    console.log('카카오 로그인 성공', data);
    const accessToken = data.response.access_token

    try {
      localStorage.removeItem('guestUser');
      const res = await axios.post(`http://localhost:3000/api/user/kakao-login`, {
        accessToken,
      },
      { withCredentials: true }
    );

      if (res.status === 200) {
        const userData = res.data.user
        console.log('userData', userData)
        setUser(userData)

        toast.success('로그인 성공!', {
          autoClose: 1000,
          hideProgressBar: true,
        })

        setTimeout(() => {
          navigate('/browse');
        }, 1000);
      }
    } catch (error) {
      console.error('카카오 로그인 실패:', error);
      toast.error('로그인 중 문제가 발생했습니다.');
    }
  };

  const handleKakaoFailure = (error: any) => {
    console.error('카카오 로그인 오류:', error);
    toast.error('카카오 로그인에 실패했습니다.');
  };

  return { handleKakaoSuccess, handleKakaoFailure };
};

export default useKakaoLogin;
