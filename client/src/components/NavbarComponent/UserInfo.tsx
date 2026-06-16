
import useCalculateAsset from "../../hooks/useCalculateAsset";
import useGetAssetData from "../../hooks/useGetAssetData";
import { StyledAngle, StyledCoins, StyledLogout, StyledUserInfo } from "./style";

interface UserInfoProps{
    userName: string;
    onLogoutClick: (e: React.MouseEvent) => void;
    onInterestedClick: () => void;
    onRecentClick: () => void
    userRef: React.RefObject<HTMLDivElement>
}

export function UserInfo({ 
    userName, onLogoutClick, onInterestedClick, onRecentClick, userRef
}: UserInfoProps) {
     const { data } = useGetAssetData()
        const calculatedData = useCalculateAsset(data)
    
        const {
            // *총 자산
            totalAssets,
            // * 평가손익
            totalProfitLoss,
            //*보유 현금
            availableOrder
        } = calculatedData || {};

    
    return (
        <StyledUserInfo ref={userRef}>
            <StyledAngle />
            <h1 className='font-bold text-center pb-2'>Welcome {userName}</h1>
            <p><strong>보유 현금</strong> <span>{Math.round(availableOrder)?.toLocaleString()}</span></p>
            <p><strong>보유 자산</strong> <span>{Math.round(totalAssets)?.toLocaleString()}</span></p>
            <p><strong>평가 손익</strong>
                <span className={`${totalProfitLoss > 0 ? 'text-red-500' : 'text-blue-600'}`}>{totalProfitLoss > 0 && '+'}{Math.round(totalProfitLoss)?.toLocaleString()}</span>
            </p>
            <hr />
            <StyledCoins>
                <span onClick={onInterestedClick}>관심 코인</span>
                <span onClick={onRecentClick}>최근 본 코인</span>
            </StyledCoins>
            <hr />
            <StyledLogout onClick={onLogoutClick}>
                <p>로그아웃</p>
            </StyledLogout>
            
        </StyledUserInfo>
    )
}