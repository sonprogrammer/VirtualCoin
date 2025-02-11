import { useState } from "react"
import { StyledAllCancleBtn, StyledAmount, StyledBookBox, StyledBookBoxTitle, StyledBookContainer, StyledBookContents, StyledBookInput, StyledBookTitle, StyledCancleBtn, StyledContent, StyledDivider } from "./style"


const CoinBookForm = () => {
  const [isChecked, SetIsChecked] = useState<boolean>(false)
  const [section, setSection] = useState<'미체결' | '체결'>('미체결')
  const [cancleBook, setCancleBook] = useState<boolean>(false)

  const handleDoubleClick = () => {
    SetIsChecked(!isChecked)
  }

  const handleSectionClick = (page: '미체결' | '체결') => {
    setSection(page)
  }


  return (
    <StyledBookContainer>
      <StyledDivider>
        <StyledBookTitle>
          <button
            onClick={() => handleSectionClick('미체결')}
            className={`${section === '미체결' ? 'bg-blue-700 text-white font-bold' : ''}`}
          >미체결</button>
          <button
            onClick={() => handleSectionClick('체결')}
            className={`${section === '체결' ? 'bg-red-600 text-white font-bold' : ''}`}
          >체결</button>
        </StyledBookTitle>

        {/* 여러개의 박스들 */}
        <StyledBookContents>
          {/* //*여기서 미체결 페이지랑 체결 페이지 나누면됨  */}
          <StyledBookBox>
            <StyledBookInput onClick={handleDoubleClick}>
              <input type="radio" name="booked" checked={isChecked} />
            </StyledBookInput>
            <StyledContent>
              <StyledBookBoxTitle>
                <p onClick={handleDoubleClick}><strong>코인이름</strong></p>
                <h1>매수/매도</h1>
              </StyledBookBoxTitle>
              <StyledAmount>
                <p><strong>10개</strong> 주문</p>
                <p>(개당 <strong>4,000원</strong>)</p>
              </StyledAmount>
            </StyledContent>
            <StyledCancleBtn>
              <button>취소</button>
            </StyledCancleBtn>
          </StyledBookBox>

        </StyledBookContents>
      </StyledDivider>

      <StyledAllCancleBtn onClick={() => SetIsChecked(false)}>
        <p>선택취소</p>
      </StyledAllCancleBtn>
    </StyledBookContainer>
  )
}

export default CoinBookForm
