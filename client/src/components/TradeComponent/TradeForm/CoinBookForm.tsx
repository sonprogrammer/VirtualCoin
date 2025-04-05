import { useEffect, useState } from "react"
import { StyledAllCancleBtn, StyledAmount, StyledBookBox, StyledBookBoxTitle, StyledBookContainer, StyledBookContents, StyledBookTitle, StyledCancleBtn, StyledContent, StyledDate, StyledDivider } from "./style"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import dayjs from 'dayjs';
import { userState } from "../../../context/userState";
import { useRecoilValue } from "recoil";
import usePostDeleteOrder from "../../../hooks/usePostDeleteOrder";
import useGetAllTransaction from "../../../hooks/useGetAllTransaction";


interface Order {
  _id: string;
  coinKName: string;
  type: string;
  status: string;
  orderQuantity: number;
  orderPrice: number;
  completedTime?: string; 
};

// const mockData = {
//   미체결: [
//     { id: 1, name: '비트코인', type: '매수', amount: 2, price: 72000000 },
//     { id: 2, name: '이더리움', type: '매도', amount: 5, price: 3500000 },
//     { id: 3, name: '리플', type: '매수', amount: 100, price: 950 },
//     { id: 4, name: '비트코인', type: '매수', amount: 2, price: 72000000 },
//     { id: 5, name: '이더리움', type: '매도', amount: 5, price: 3500000 },
//     { id: 6, name: '리플', type: '매수', amount: 100, price: 950 },
//     { id: 7, name: '비트코인', type: '매수', amount: 2, price: 72000000 },
//     { id: 8, name: '이더리움', type: '매도', amount: 5, price: 3500000 },
//     { id: 9, name: '리플', type: '매수', amount: 100, price: 950 },
//     { id: 10, name: '비트코인', type: '매수', amount: 2, price: 72000000 },
//     { id: 11, name: '이더리움', type: '매도', amount: 5, price: 3500000 },
//     { id: 12, name: '리플', type: '매수', amount: 100, price: 950 },
//   ],
//   체결: [
//     { id: 4, name: '비트코인', type: '매도', amount: 1, price: 73000000, date: '2025-02-12T10:00:00Z' },
//     { id: 5, name: '이더리움', type: '매수', amount: 3, price: 3400000, date: '2025-02-11T14:30:00Z' },
//     { id: 6, name: '리플', type: '매도', amount: 500, price: 970, date: '2025-02-10T09:00:00Z' },
//   ],
// };


const CoinBookForm = () => {
  const [section, setSection] = useState<'미체결' | '체결'>('미체결')
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

  
  const user = useRecoilValue(userState);
  
  
  const {data =[]} = useGetAllTransaction(user._id)
  const coins = data?.allTransaction?.orders || [];
  // console.log('coins', coins)

  const [coinStatus, setCoinStatus] = useState<{ 미체결: Order[]; 체결: Order[] }>(coins);

  const { mutate: deleteOrder} = usePostDeleteOrder()

  useEffect(() => {
    const holding = coins.filter((c: Order) => c.status === 'PENDING')
    const completed = coins.filter((c:Order) => c.status === 'COMPLETED')
    setCoinStatus({미체결: holding, 체결: completed})
  },[coins])
  
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
    setCoinStatus(prev => {
      const newData = {
        ...prev,
        [section]: prev[section].filter(order => !checkedItems[order._id]) 
      };

      return newData;
    });
  
    setCheckedItems({});
  }

  const handleDeleteClick = (id: string) => {
    setCoinStatus(prev => {
      const newData = {
        ...prev,
        [section]: prev[section].filter((order) => order._id !== id)
      };
      deleteOrder([id])
      console.log(newData); 
      return newData;
    });
  }

  

  const handleSectionClick = (page: '미체결' | '체결') => {
    setSection(page)
  }
  useEffect(() => {
    console.log('checking', checkedItems)

  }, [checkedItems, coinStatus]);
  

 

  return (
    <StyledBookContainer>
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

            <StyledDivider>
        {/* 여러개의 박스들 */}
        <StyledBookContents className="bookcontent">
          {/* //TODO여기서 아무것도없으면 다른 애니메이션 넣기  */}
          {coins[section]?.length === 0 && <p>아무것도 없음</p>}

          {coinStatus[section]?.map((order) => (
            <StyledBookBox 
              key={order._id} 
              onClick={() => handleCheckboxChange(order._id)}
              className={`${checkedItems[order._id] ? 'bg-gray-400 cursor-pointer' : 'cursor-pointer'}`}
              >
              <StyledContent>
                <StyledBookBoxTitle>
                  <p ><strong>{order.coinKName}</strong></p>
                  <h1 className={`${order.type === 'SELL' ? 'text-blue-700 font-bold' : 'text-red-600 font-bold'}`}>
                    {order.type === 'SELL' ? '매도' : '매수'}
                  </h1>
                </StyledBookBoxTitle>
                <StyledAmount>
                  <p><strong>{order.orderQuantity.toFixed(3)}개</strong> 주문</p>
                  <p>
                    <span>개당</span>
                    <span> 
                      <strong>{order.orderPrice.toLocaleString()}원</strong>
                    </span>
                  </p>
                </StyledAmount>
              </StyledContent>
              {section === '미체결' ? (
                <StyledCancleBtn onClick={e => {e.stopPropagation(); e.preventDefault(); handleDeleteClick(order._id)}}>
                    <button>취소</button>
                </StyledCancleBtn>
              ) : section === '체결' && order.completedTime ? (
                <StyledDate>
                  <h1>체결일</h1>
                  <p>{dayjs(order.completedTime).format('YY.MM.DD')}</p>
                </StyledDate>
                ) : null}
            </StyledBookBox>
          ))}

        </StyledBookContents>
      </StyledDivider>


      {section === '미체결' ? (
        <StyledAllCancleBtn>
        <button onClick={handleUnCheckBox}>
            <FontAwesomeIcon icon={faRotateRight} />
            <span>초기화</span>
        </button>
        <button onClick={handleDeleteAll}>예약 취소</button>
      </StyledAllCancleBtn>
      ) : (
        <StyledAllCancleBtn>
        <button onClick={handleUnCheckBox}>
            <FontAwesomeIcon icon={faRotateRight} />
            <span>초기화</span>
        </button>
        <button onClick={handleDeleteAll}>선택 삭제</button>
      </StyledAllCancleBtn>
      )
      }

    </StyledBookContainer>
  )
}

export default CoinBookForm
