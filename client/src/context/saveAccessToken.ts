export const saveAccessToken = (accessToken:string) => {
    localStorage.setItem('accessToken', accessToken)
}

export const getAccessToken = () => {
    const accessToken = localStorage.getItem('accessToken')
    return accessToken
}