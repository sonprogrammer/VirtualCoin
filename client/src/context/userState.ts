import { atom } from "recoil";

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


export const initialUserState = {
  _id: null,
  name: '',
  isGuest: false,
  totalAssets: 0,
  totalCash: 0,
  availableBalance: 0,
  holdings: [],
  transactions: [],
  interestedCoins: [],
  recentCoins: [],
  sessionExpires: null,
  createdAt: '',
  updatedAt: '',
}


export const userState = atom<UserInfo | null>({
    key: 'userState',
    default: null
})

export const accessTokenState = atom<string | null>({
    key: 'accessTokenState',
    default: null
})