import { Route, Routes } from "react-router-dom"
import { AssetPage, CoinDetailPage, LandingPage, LayoutPage, MainPage, NotfoundPage, RankingPage } from "./pages"


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
