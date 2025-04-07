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



const CoinBookForm = () => {
  const [section, setSection] = useState<'미체결' | '체결'>('미체결')
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  // console.log('checkitem', checkedItems)
  const user = useRecoilValue(userState);
  
  
  const {data =[], refetch} = useGetAllTransaction(user._id)
  const coins = data?.allTransaction?.orders || [];
  // console.log('coins', coins)

  const [coinStatus, setCoinStatus] = useState<{ 미체결: Order[]; 체결: Order[] }>(coins);

  // console.log('coinstatus', coinStatus)
  const { mutate: deleteOrder} = usePostDeleteOrder()

  useEffect(() => {
    const holding = coins.filter((c: Order) => c.status === 'PENDING')
    const completed = coins.filter((c:Order) => c.status === 'COMPLETED')
    setCoinStatus({미체결: holding, 체결: completed})
  },[coins])
  
  const handleCheckboxChange = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleUnCheckBox = () => {
    setCheckedItems({})
  }

  const handleDeleteAll = () => {
    const selectedIds = Object.entries(checkedItems)
      .filter(([_, checked]) => checked)
      .map(([id]) => id)

      if(selectedIds.length === 0) return

      deleteOrder(
        {userId: user._id, orderId: selectedIds},
        {onSuccess: () => { 
          refetch(); 
          setCheckedItems({})
        }}
      )
    
  }

  const handleDeleteClick = (id: string) => {
      deleteOrder(
        {userId: user._id, orderId:[id]},
        {onSuccess: () => { 
          refetch(); 
          setCheckedItems({})
        }}
      )
  }

  

  const handleSectionClick = (page: '미체결' | '체결') => {
    setSection(page)
  }
  useEffect(() => {
    // console.log('checking', checkedItems)

  }, [checkedItems, coinStatus,deleteOrder]);
  

 

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
        <>

      </>
      )
      }

    </StyledBookContainer>
  )
}

export default CoinBookForm
