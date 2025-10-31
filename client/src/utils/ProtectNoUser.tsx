import { useRecoilValue } from "recoil";
import { userState } from "../context/userState";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectNoUser = ({children}: {children:ReactNode}) => {
    const user = useRecoilValue(userState);
  const navigate = useNavigate()
    console.log('user', user)
  
    useEffect(() => {
      if (!user || !user._id) {
        navigate('/')
      }
    }, [user]);
  
    return <>{children}</>
}

export default ProtectNoUser
