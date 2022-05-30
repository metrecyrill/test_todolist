import {api, apiWithToken} from "../services"
import jwtDecode from "jwt-decode"

export const auth = async (login, password) => {
  const {data} = await api.post('/api/user/login', {login, password})
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token)
}

export const check = async () => {
  const {data} = await apiWithToken.get('/api/user/auth')
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token)
}