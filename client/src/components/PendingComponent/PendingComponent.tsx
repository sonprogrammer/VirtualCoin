import dayjs from 'dayjs'
import { StyledContainer, StyledTable, StyledTableBody, StyledTableHead, StyledTop } from './style'
import { useCallback, useMemo, useState } from 'react'
import useGetPendingCoins from '../../hooks/useGetPendingCoins'
import { useRecoilValue } from 'recoil'
import { userState } from '../../context/userState'
import usePostDeleteOrder from '../../hooks/usePostDeleteOrder'

const PendingComponent = () => {
    const [selectedOrder, setSelectedOrder] = useState<Set<string>>(new Set())
    const [cancleOrder, setCancleOrder] = useState<Set<string>>(new Set())
    const [selectedAll, setSelectedAll] = useState<boolean>(false)

    const user = useRecoilValue(userState);

    
    const {data =[]} = useGetPendingCoins(user._id)
    const { mutate: deleteOrder} = usePostDeleteOrder()


    const handleRadioChange = useCallback((orderId: string) => {
        setSelectedOrder(prev => {
            const newSet = new Set(prev)
            newSet.has(orderId) ? newSet.delete(orderId) : newSet.add(orderId)
            return newSet
        })
    },[])

    const handleCancleClick = useCallback(() => {
        if(selectedOrder.size === 0) return
            deleteOrder({userId: user._id, orderId: Array.from(selectedOrder)}, {
                onSuccess: () => {
                    setCancleOrder(prev => new Set([...prev, ...selectedOrder]))
                    setSelectedOrder(new Set())
                }
            })
    },[selectedOrder,deleteOrder, user._id])

    const handleCancleBtnClick = useCallback((orderId: string, e: React.MouseEvent) => {
        deleteOrder({userId: user._id, orderId: [orderId]},{
            onSuccess: () => {
                setCancleOrder(prev => new Set([...prev, orderId]))
            }
        })
        e.stopPropagation(); 
    }, [deleteOrder, user._id]);

    const filteredData = useMemo(() => {

        return data.filter((a:any) => !cancleOrder.has(a._id))
    }, [cancleOrder, data]);


    const handleAllClick = useCallback(() =>{
        if(selectedAll){
            setSelectedOrder(new Set())
            setSelectedAll(false)
        }else{
            setSelectedOrder(new Set(filteredData.map((a:any) => a._id)))
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
                        {filteredData?.map((a:any) => {
                            const formattedDays = dayjs(a.orderTime).format('YY.MM.DD'); 
                            const formattedTime = dayjs(a.orderTime).format('HH:mm'); 
                            return(
                            <tr key={a._id} 
                                onClick={() => handleRadioChange(a._id)}
                                className={`${selectedOrder.has(a.orderTime) ? 'bg-gray-100' : ''}`}
                                >
                                <td>
                                <input type="checkbox"
                                    checked={selectedOrder.has(a._id)}
                                    onChange={(e) => {
                                        handleRadioChange(a._id)
                                        e.stopPropagation()}}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </td>
                                <td>
                                    <p>{formattedDays}</p>    
                                    <p>{formattedTime}</p>
                                </td>
                                <td>{a.coinKName}</td>
                                <td
                                    className={`${a.type === 'SELL' ? 'text-blue-600' : 'text-red-500'}`}
                                >{a.type === 'BUY' ? '매수' : '매도'}</td>
                                <td>{a.orderPrice.toLocaleString()}</td>
                                <td>{a.orderQuantity.toLocaleString()}</td>
                                <td>{a.orderQuantity.toLocaleString()}</td>
                                <td>
                                    <button 
                                        onClick={(e) => {handleCancleBtnClick(a._id, e)
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
