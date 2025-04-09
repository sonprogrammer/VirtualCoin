import { useState } from "react"
import { StyledBox, StyledContainer, StyledContents, StyledTabs } from "./style"
import { MyAsset, PendingComponent, TransactionComponent } from "../../components"


const AssetPage = () => {
  // TODO 기본 값 보유자산으로 바꾸기
  const [tabs, setTabs ] = useState<'보유자산' | '거래내역' | '미체결'>('보유자산')
  

  const handelTabClick = (tab: '보유자산' | '거래내역' | '미체결') => {
    setTabs(tab)
  }
  
  
  return (
    <StyledContainer className="page">

      <StyledBox className="box">
        <StyledTabs>
          <p onClick={() => handelTabClick('보유자산')}
             className={`${tabs === '보유자산' ? 'border-b-[3px] border-red-500 text-red-500' : 'border-b-2'}`}
            >
            보유자산
          </p>
          <p onClick={() => handelTabClick('거래내역')}
             className={`${tabs === '거래내역' ? 'border-b-[3px] border-red-500 text-red-500' : 'border-b-2'}`}
            >
            거래내역
          </p>
          <p onClick={() => handelTabClick('미체결')}
             className={`${tabs === '미체결' ? 'border-b-[3px] border-red-500 text-red-500' : 'border-b-2'}`}
            >
            미체결
          </p>
        </StyledTabs>

          {/* 탭별 내용 */}
        <StyledContents className="content">
          {tabs === '보유자산' && <MyAsset />}
          {tabs === '거래내역' && <TransactionComponent />}
          {tabs === '미체결' && <PendingComponent />}
        </StyledContents>
      </StyledBox>

    </StyledContainer>
  )
}

export default AssetPage
