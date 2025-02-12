import { useEffect, useState } from "react"
import { StyledAllCancleBtn, StyledAmount, StyledBookBox, StyledBookBoxTitle, StyledBookContainer, StyledBookContents, StyledBookInput, StyledBookTitle, StyledCancleBtn, StyledContent, StyledDate, StyledDivider } from "./style"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import dayjs from 'dayjs';



interface Order {
  id: number;
  name: string;
  type: string;
  amount: number;
  price: number;
  date?: string; 
};

const mockData = {
  미체결: [
    { id: 1, name: '비트코인', type: '매수', amount: 2, price: 72000000 },
    { id: 2, name: '이더리움', type: '매도', amount: 5, price: 3500000 },
    { id: 3, name: '리플', type: '매수', amount: 100, price: 950 },
  ],
  체결: [
    { id: 4, name: '비트코인', type: '매도', amount: 1, price: 73000000, date: '2025-02-12T10:00:00Z' },
    { id: 5, name: '이더리움', type: '매수', amount: 3, price: 3400000, date: '2025-02-11T14:30:00Z' },
    { id: 6, name: '리플', type: '매도', amount: 500, price: 970, date: '2025-02-10T09:00:00Z' },
  ],
};


const CoinBookForm = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [section, setSection] = useState<'미체결' | '체결'>('미체결')
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

  // *목업데이터임
  const [mockDataState, setMockDataState] = useState<{ 미체결: Order[]; 체결: Order[] }>(mockData);


  const handleCheckboxChange = (id: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleUnCheckBox = () => {
    setCheckedItems({})
  }

  const handleDeleteAll = () => {
    setMockDataState(prev => {
      const newData = {
        ...prev,
        [section]: prev[section].filter(order => !checkedItems[order.id]) 
      };

      return newData;
    });
  
    setCheckedItems({});
  }

  const handleDeleteClick = (id: number) => {
    setMockDataState(prev => {
      const newData = {
        ...prev,
        [section]: prev[section].filter((order) => order.id !== id)
      };
      console.log(newData); 
      // console.log('mockData', mockDataState); 
      return newData;
    });
  }

  

  const handleSectionClick = (page: '미체결' | '체결') => {
    setSection(page)
  }
  useEffect(() => {
    console.log('checking', checkedItems)

  }, [checkedItems, mockDataState]);
  

 

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
          {/* //TODO여기서 아무것도없으면 다른 애니메이션 넣기  */}
          {mockDataState[section].length === 0 && <p>아무것도 없음</p>}

          {mockDataState[section].map((order) => (
            <StyledBookBox key={order.id} onClick={() => handleCheckboxChange(order.id)}>
              <StyledBookInput >
                <input type="checkbox" name="booked" checked={checkedItems[order.id] || false} onChange={() => handleCheckboxChange(order.id)} />
              </StyledBookInput>
              <StyledContent>
                <StyledBookBoxTitle>
                  <p ><strong>{order.name}</strong></p>
                  <h1 className={`${order.type === '매도' ? 'text-blue-700 font-bold' : 'text-red-600 font-bold'}`}>{order.type}</h1>
                </StyledBookBoxTitle>
                <StyledAmount>
                  <p><strong>{order.amount}개</strong> 주문</p>
                  <p>(개당 <strong>{order.price.toLocaleString()}원</strong>)</p>
                </StyledAmount>
              </StyledContent>
              {section === '미체결' ? (
                <StyledCancleBtn onClick={e => {e.stopPropagation(); e.preventDefault(); handleDeleteClick(order.id)}}>
                    <button>취소</button>
                </StyledCancleBtn>
              ) : section === '체결' && order.date ? (
                <StyledDate>
                  <h1>체결일</h1>
                  <p>{dayjs(order.date).format('YY.MM.DD')}</p>
                </StyledDate>
                ) : null}
            </StyledBookBox>
          ))}

        </StyledBookContents>
      </StyledDivider>


      {section === '미체결' ? (
        <StyledAllCancleBtn onClick={() => setIsChecked(false)}>
        <button onClick={handleUnCheckBox}>
            <FontAwesomeIcon icon={faRotateRight} />
            초기화
        </button>
        <button onClick={handleDeleteAll}>예약 취소</button>
      </StyledAllCancleBtn>
      ) : (
        <StyledAllCancleBtn onClick={() => setIsChecked(false)}>
        <button onClick={handleUnCheckBox}>
            <FontAwesomeIcon icon={faRotateRight} />
            초기화
        </button>
        <button onClick={handleDeleteAll}>선택 삭제</button>
      </StyledAllCancleBtn>
      )
      }

    </StyledBookContainer>
  )
}

export default CoinBookForm
