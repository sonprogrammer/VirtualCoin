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


  const user = useRecoilValue(userState);
  
  
  const {data =[], refetch} = useGetAllTransaction(user._id)
  const coins = data?.allTransaction?.orders || [];


  const [coinStatus, setCoinStatus] = useState<{ 미체결: Order[]; 체결: Order[] }>(coins);


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


  }, [checkedItems, coinStatus,deleteOrder]);
  

 

  return (
    <StyledBookContainer>
        <StyledBookTitle>
          <button
            onClick={() => handleSectionClick('미체결')}
            className={section === '미체결' ? 'active-pending' : ''}
          >미체결</button>
          <button
            onClick={() => handleSectionClick('체결')}
            className={section === '체결' ? 'active-completed' : ''}
          >체결</button>
        </StyledBookTitle>

        <StyledDivider className="mt-4">
          <StyledBookContents>
            {coinStatus[section]?.length === 0 && (
              <p className="text-center py-10 text-zinc-600 text-sm font-bold">내역이 없습니다.</p>
            )}

            {coinStatus[section]?.map((order) => (
              <StyledBookBox 
                key={order._id} 
                onClick={() => handleCheckboxChange(order._id)}
                className={checkedItems[order._id] ? 'selected' : ''}
              >
                <StyledContent className="!ml-0">
                  <StyledBookBoxTitle>
                    <p className="text-zinc-100 font-bold">{order.coinKName}</p>
                    <span className={order.type === 'SELL' ? 'text-sky-400 font-black text-xs' : 'text-red-500 font-black text-xs'}>
                      {order.type === 'SELL' ? '매도' : '매수'}
                    </span>
                  </StyledBookBoxTitle>
                  <StyledAmount className="mt-1">
                    <p className="text-zinc-400 font-mono">{order.orderQuantity.toFixed(3)} <span className="text-[10px]">Qty</span></p>
                    <p className="text-zinc-500 ml-2">@ {order.orderPrice?.toLocaleString()}</p>
                  </StyledAmount>
                </StyledContent>

                {section === '미체결' ? (
                  <StyledCancleBtn 
                    className="!bg-zinc-800 !text-zinc-300 hover:!bg-red-900/30 hover:!text-red-500 transition-colors"
                    onClick={e => {e.stopPropagation(); handleDeleteClick(order._id)}}
                  >
                    취소
                  </StyledCancleBtn>
                ) : (
                  <StyledDate>
                    <p className="text-zinc-600 text-[10px] font-bold uppercase">Completed</p>
                    <p className="text-zinc-400 font-mono">{dayjs(order.completedTime).format('MM.DD HH:mm')}</p>
                  </StyledDate>
                )}
              </StyledBookBox>
            ))}
          </StyledBookContents>
        </StyledDivider>

        {section === '미체결' && (
          <StyledAllCancleBtn>
            <button onClick={handleUnCheckBox}>
                <FontAwesomeIcon icon={faRotateRight} />
                <span>초기화</span>
            </button>
            <button 
              onClick={handleDeleteAll}
              className="!bg-zinc-800 border border-zinc-700 hover:!bg-red-900/40 hover:!border-red-900 transition-all"
            >
              선택 예약 취소
            </button>
          </StyledAllCancleBtn>
        )}
    </StyledBookContainer>
  )
}

export default CoinBookForm
