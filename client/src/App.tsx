import { Route, Routes, useNavigate } from "react-router-dom"
import { AssetPage, CoinDetailPage, LandingPage, LayoutPage, MainPage, NotfoundPage, RankingPage } from "./pages"
import ProtectNoUser from "./utils/ProtectNoUser"
import { useRecoilState, useRecoilValue } from "recoil"
import { refreshState } from "./context/refreshExpired"
import { useEffect } from "react"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLogout from "./hooks/useLogout"
import { userState } from "./context/userState"




function App() {


  return (
    <>

      <Routes>
        <Route path="/" element={
          <LandingPage />
        } />
        <Route element={
          <LayoutPage />
        }>
          <Route path="/browse" element={
            <ProtectNoUser>
              <MainPage />
            </ProtectNoUser>
          }
          />
          <Route path="/coin/:coinId" element={
            <ProtectNoUser>
              <CoinDetailPage />
            </ProtectNoUser>
          } />
          <Route path="/asset" element={
            <ProtectNoUser>
              <AssetPage />
            </ProtectNoUser>
          } />
          <Route path="/rank" element={
            <ProtectNoUser>
              <RankingPage />
            </ProtectNoUser>
          } />

          <Route path="*" element={
            <NotfoundPage />
          } />
        </Route>
      </Routes>
      <ToastContainer position="top-center" />

    </>
  )
}

export default App
