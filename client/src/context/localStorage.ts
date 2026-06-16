export interface UserInfo {
    _id: string;
    name: string;
    isGuest: boolean;
    availableBalance: number;
    interestedCoins: string[];
    recentCoins: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export const saveUserToLocalStorage = (user: UserInfo) => {
    localStorage.setItem('user', JSON.stringify(user))
}

export const getUserFromLocalStorage = () =>{
    const userData = localStorage.getItem('user')
    return userData ? JSON.parse(userData) : null
}
