

import { toast } from 'react-toastify';

const useKakaoLogin = () => {

  const handleKakaoLogin = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      toast.error('카카오 로그인을 준비 중입니다.')
      return
    }

    console.log('kakaologin click')
    window.Kakao.Auth.authorize({
      redirectUri: `${window.location.origin}/callback`,
      throughTalk: false
    })
  }

  return { handleKakaoLogin };
};

export default useKakaoLogin;
