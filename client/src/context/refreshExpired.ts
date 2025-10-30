import { atom } from "recoil";

export const refreshState = atom({
    key: 'refresh',
    default: {
        expired: false,
        message: ''
    }
})