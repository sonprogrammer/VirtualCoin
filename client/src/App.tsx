import { Route, Routes, useNavigate } from "react-router-dom"
import { AssetPage, CoinDetailPage, LandingPage, LayoutPage, MainPage, NotfoundPage, RankingPage } from "./pages"
import { useEffect, useRef, useState } from "react";
import { LoginDoubleCheckModalComponent } from "./components";

function App() {
  // TODO 로그인 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkedPassword, setCheckPassword] = useState(false)
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  

  const navigate = useNavigate()


  // TODO비밀번호 입력 완료시에만 2차 비밀번호 모달 사라짐
  useEffect(() => {
    const resetTimer = () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
  
      timeoutIdRef.current = setTimeout(() => {
        setCheckPassword(true);
      }, 3000);
    };

    const handleUserActivity = () => {
      setCheckPassword(false);
      resetTimer();
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    resetTimer();

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, []);

  // TODO 로그인 없이 바로 browse로 가려하면 랜딩페이지로 리다이렉션 됨
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     alert('로그인을 먼저 해주세요')
  //     navigate('/'); 
  //   }
  // }, [isLoggedIn]);
  
  
  return (
    <>
          {/* {checkedPassword && <div className=""><LoginDoubleCheckModalComponent /></div>} */}
        <Routes>
          <Route path="/" element={
            <LandingPage />    
          } />
          <Route element={
            <LayoutPage />
          }>
             <Route path="/browse" element={<MainPage />} />
            <Route path="/coin/:coinId" element={
              <CoinDetailPage />
            }/>
            <Route path="/asset" element={
              <AssetPage />
            }  />
            <Route path="/rank" element={
              <RankingPage />
            }  />
            
            <Route path="*" element={
              <NotfoundPage />
            }/>
          </Route>
        </Routes> 
    </>
  )
}

export default App
