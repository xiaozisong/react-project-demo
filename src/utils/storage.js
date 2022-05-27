const LOGIN_TOKEN = 'react-practice-demo'
export const setToken = (token) => {
  localStorage.setItem(LOGIN_TOKEN, token)
}

export const getToken = () => {
  return localStorage.getItem(LOGIN_TOKEN)
}

export const removeToken = () => {
  localStorage.removeItem(LOGIN_TOKEN)
}
const USER_INFO = 'react-user-info'
export const setUserInfo = (userInfo) => {
  localStorage.setItem(USER_INFO, JSON.stringify(userInfo))
}

export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem(USER_INFO))
}

export const removeUserInfo = () => {
  localStorage.removeItem(USER_INFO)
}