import axios from 'axios'

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL })
const apiWithToken = axios.create({ baseURL: process.env.REACT_APP_API_URL })

const authInterceptor = config => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}
apiWithToken.interceptors.request.use(authInterceptor)

export {
  api,
  apiWithToken
}