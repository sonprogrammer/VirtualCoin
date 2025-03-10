

export const getUserFromLocalStorage = () =>{
    const userData = localStorage.getItem('guestUser');
    return userData ? JSON.parse(userData) : null;
}

