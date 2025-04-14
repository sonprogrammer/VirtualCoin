import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { userState } from '../context/userState'; 
import { saveUserToLocalStorage } from '../context/localStorage';

const useKakaoLogin = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState); 

  const handleKakaoSuccess = async (data: any) => {
    console.log('카카오 로그인 성공', data);
    const accessToken = data.response.access_token

    try {
      localStorage.removeItem('user');
      const res = await axios.post(`http://localhost:3000/api/user/kakao-login`, {
        accessToken,
      },
      { withCredentials: true }
    );

      if (res.status === 200) { 
        const userData = res.data.user
        setUser(userData)
        saveUserToLocalStorage(userData)

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
