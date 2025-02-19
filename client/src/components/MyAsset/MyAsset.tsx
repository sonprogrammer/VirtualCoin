import { useEffect, useState } from "react"
import { AssetCircleGraph } from "../AssetCircleGraph"
import { AssetList } from "../AssetList"
import { AssetResultTextComponent } from "../AssetResultTextComponent"
import { StyledAssetGraph, StyledAssetGraphToggle, StyledAssetList, StyledAssetResultText, StyledContainer, StyledTotalAsset } from "./style"
import AssetListTb from "../AssetList/AssetListTb"




const MyAsset = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [showGraph, setShowGraph] = useState<boolean>(true);
  const [graphToggle, setGraphToggle] = useState<boolean>(false);


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleGraphToggle = () => {
    setGraphToggle(!graphToggle)
  }
  
  useEffect(() => {
    if(windowWidth <= 950){
      setShowGraph(false)
    }else{
      setShowGraph(true)
    }
  },[windowWidth])
  
  return (
    <StyledContainer className="myAsset">
        <StyledTotalAsset className={`${showGraph === false ? 'flex flex-col' : ''}`}>
            
            <StyledAssetResultText
                 className={`${showGraph === false ? 'w-full' : 'w-[60%] border-r-2'}`}
            >
                <AssetResultTextComponent />
            </StyledAssetResultText>

            
            {
              showGraph ? (
                <StyledAssetGraph 
                  className={`${showGraph === true ? 'w-[40%]' : 'w-full'}`}>
                  <AssetCircleGraph />
                </StyledAssetGraph>
              ): 
              (
                <>
                  <StyledAssetGraphToggle onClick={handleGraphToggle}>
                  <span>보유자산 포트폴리오</span>
                  <span>
                    {graphToggle ? '▲' : '▼'}
                  </span>
                </StyledAssetGraphToggle>
                { graphToggle && (
                  <StyledAssetGraph className="flex w-full justify-center">
                    <AssetCircleGraph />
                </StyledAssetGraph>
                )}
                </>
              )
            }
            

        </StyledTotalAsset>

      <StyledAssetList>
        <div className="border-t-2 py-2 pl-5">보유자산 목록</div>
        {
          windowWidth > 700 ? (
            <AssetList />
          ): (
            <AssetListTb />
          )
        }
      </StyledAssetList>
    </StyledContainer>
  )
}

export default MyAsset
