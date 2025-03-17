export const saveUserToLocalStorage = (user: any) => {
    localStorage.setItem('user', JSON.stringify(user))
}

export const saveAssetToLocalStorage = (asset: any) => {
    localStorage.setItem('asset', JSON.stringify(asset))
}

export const getUserFromLocalStorage = () =>{
    const userData = localStorage.getItem('user')
    return userData ? JSON.parse(userData) : null
}

export const getAssetFromLocalStorage = () => {
    const assetData = localStorage.getItem('asset')
    return assetData ? JSON.parse(assetData) : null
}