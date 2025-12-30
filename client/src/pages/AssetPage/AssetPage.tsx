import { useState } from "react"
import { StyledBox, StyledContainer, StyledContents, StyledTabs } from "./style"
import { MyAsset, PendingComponent, TransactionComponent } from "../../components"

type TabType = '보유자산' | '거래내역' | '미체결'
const AssetPage = () => {
  const [tabs, setTabs ] = useState<TabType>('보유자산')
  

  const handleTabClick = (tab: '보유자산' | '거래내역' | '미체결') => {
    setTabs(tab)
  }
  
  
  return (
    <StyledContainer className="page">

      <StyledBox className="box">
        <StyledTabs>
          {(['보유자산', '거래내역', '미체결'] as TabType[]).map((tabName) => (
            <p
              key={tabName}
              onClick={() => handleTabClick(tabName)}
              className={tabs === tabName ? 'active' : ''}
            >
              {tabName}
            </p>
          ))}
        </StyledTabs>


          <StyledContents>
          <div key={tabs}> 
            {tabs === '보유자산' && <MyAsset />}
            {tabs === '거래내역' && <TransactionComponent />}
            {tabs === '미체결' && <PendingComponent />}
          </div>
        </StyledContents>
      </StyledBox>

    </StyledContainer>
  )
}

export default AssetPage
