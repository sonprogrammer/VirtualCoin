
import dayjs from 'dayjs'
import data from './mockupData'
import { StyledContainer, StyledTable, StyledTableBody, StyledTableHead, StyledTop } from './style'
import { useCallback, useMemo, useState } from 'react'

const PendingComponent = () => {
    const [selectedOrder, setSelectedOrder] = useState<string[]>([])
    // TODO데이터 타입 바꿔야함 지금은 목업꺼라 아래가 가능
    const [cancleOrder, setCancleOrder] = useState<string[]>([])
    const [selectedAll, setSelectedAll] = useState<boolean>(false)


    // TODO ordertime으로 하는게 아니라 objectId로 하기
    const handleRadioChange = useCallback((orderTime: string) => {
        setSelectedOrder(prev => {
            if(prev.includes(orderTime)){
                return prev.filter(a => a !== orderTime)
            }else{
                return [...prev, orderTime]
            }
        })
    },[])

    const handleCancleClick = useCallback(() => {
        setCancleOrder(prev => [...prev, ...selectedOrder])
    },[selectedOrder])

    const handleCancleBtnClick = useCallback((orderTime: string, e: React.MouseEvent) => {
        setCancleOrder(prev => [...prev, orderTime]); 
        e.stopPropagation(); 
    }, []);

    const filteredData = useMemo(() => data.filter(a => !cancleOrder.includes(a.orderTime)), [cancleOrder, data]);


    const handleAllClick = useCallback(() =>{
        const allOrders = filteredData.map(a => a.orderTime)
        if(selectedAll){
            setSelectedOrder([])
            setSelectedAll(false)
        }else{
            setSelectedOrder(allOrders)
            setSelectedAll(true)
        }
    },[selectedAll, filteredData])

    
    
    return (
        <StyledContainer className='containe'>
            <StyledTop>
                <p onClick={handleCancleClick}>선택주문취소</p>
                <p onClick={handleAllClick}>
                    {selectedAll ? '선택 해제' : '전체 선택'}
                </p>
            </StyledTop>
                <StyledTable>
                    <StyledTableHead>
                        <tr>
                            <th>선택</th>
                            <th>주문시간</th>
                            <th>코인</th>
                            <th>구분</th>
                            <th>주문가격</th>
                            <th>주문량</th>
                            <th>미체결량</th>
                            <th>주문취소</th>
                        </tr>
                    </StyledTableHead>
                    <StyledTableBody>
                        {filteredData.map((a, i) => {
                            const formattedDays = dayjs(a.orderTime).format('YY.MM.DD'); 
                            const formattedTime = dayjs(a.orderTime).format('HH:mm'); 
                            return(
                            <tr key={i} 
                                onClick={() => handleRadioChange(a.orderTime)}
                                className={`${selectedOrder.includes(a.orderTime) ? 'bg-gray-100' : ''}`}
                                >
                                <td>
                                <input type="checkbox"
                                    checked={selectedOrder.includes(a.orderTime)}
                                    onChange={(e) => {
                                        handleRadioChange(a.orderTime)
                                        e.stopPropagation()}}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </td>
                                <td>
                                    <p>{formattedDays}</p>    
                                    <p>{formattedTime}</p>
                                </td>
                                <td>{a.coin}</td>
                                <td
                                    className={`${a.tradeType === '매도' ? 'text-blue-600' : 'text-red-500'}`}
                                >{a.tradeType}</td>
                                <td>{a.orderPrice}</td>
                                <td>{a.orderQuantity}</td>
                                <td>{a.unfilledQuantity}</td>
                                <td>
                                    <button 
                                        onClick={(e) => {handleCancleBtnClick(a.orderTime, e)
                                        }}>주문취소</button>
                                </td>
                            </tr>
                        )})}
                    </StyledTableBody>
                </StyledTable>
        </StyledContainer>
    )
}

export default PendingComponent
