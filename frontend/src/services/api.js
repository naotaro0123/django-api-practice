import axios from 'axios'
import store from '@/store'

const api = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// 共通前処理
api.interceptors.request.use((config) => {
  store.dispatch('message/clearMessages')
  const token = localStorage.getItem('access')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 共通エラー処理
api.interceptors.response.use((response) => {
  return response
}, (error) => {
  console.log('error.response=', error.response)
  const status = error.response ? error.response.status: 500

  let message
  switch (status) {
    case 400:
      let messages = [].concat.apply([], Object.values(error.response.data))
      store.dispatch('message/setWarningMessages', {messages: messages })
      break;

    case 401:
      const token = localStorage.getItem('access')
      if (token !== null) {
        message = 'ログイン有効期限切れ'
      } else {
        message = '認証エラー'
      }
      store.dispatch('auth/logout')
      store.dispatch('message/setErrorMessage', {message: message })
      break;
  
    case 403:
      message = '権限エラー'
      store.dispatch('message/setErrorMessage', {message: message })
      break;

    default:
      message = '想定外エラー'
      store.dispatch('message/setErrorMessage', {message: message })
      break;
  }
  return Promise.reject(error)
})

export default api