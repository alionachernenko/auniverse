export const setUserDataToLocalStorage = (userId) => {
    localStorage.setItem('userId', JSON.stringify(userId))
    localStorage.setItem('isLoggedIn', true)
}

export const removeUserDataFromLocalStorage = () => {
    localStorage.setItem('isLoggedIn', false)
    localStorage.removeItem('userId')
}

export const getDataFromLocalStorage = (property) => {
    return JSON.parse(localStorage.getItem(property))
}