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