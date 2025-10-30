import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../context/userState";
import { ReactNode, useEffect } from "react";
import { loginRequestState } from "../context/loginRequestState";

const ProtectNoUser = ({children}: {children:ReactNode}) => {
    const user = useRecoilValue(userState);
    const setLoginRequest = useSetRecoilState(loginRequestState)

    console.log('user', user)
  
    useEffect(() => {
      if (!user._id) {
        setLoginRequest(true)
      }
    }, [user, setLoginRequest]);
  
    return <>{children}</>
}

export default ProtectNoUser
