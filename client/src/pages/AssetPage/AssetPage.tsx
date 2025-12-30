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

          {/* 탭별 내용 */}
          <StyledContents>
          <div key={tabs}> {/* key를 주면 탭 전환 시 애니메이션이 재실행됩니다 */}
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
