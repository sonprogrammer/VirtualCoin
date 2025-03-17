import { atom } from "recoil";

export const assetState = atom({
    key: 'asssetState',
    default: {
        cash: 0,
        coins: [],
        userId: ''
    }
})