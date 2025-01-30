import { Route, Routes } from "react-router-dom"
import { AssetPage, BankPage, LandingPage, LayoutPage, MainPage, NewsPage, NotfoundPage } from "./pages"

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
              <MainPage />
            }  />
            <Route path="/asset" element={
              <AssetPage />
            }  />
            <Route path="/bank" element={
              <BankPage />
            }  />
            <Route path="/news" element={
              <NewsPage />
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
