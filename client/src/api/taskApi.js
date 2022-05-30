import {api, apiWithToken} from "../services"

export const getItems = async (page, limit, sort = 'name', order = 'asc') => {
  const {data} = await api.get('/api/task/', {params: {page, limit, sort, order}})
  return data
}

export const getOne = async (id) => {
  const {data} = await api.get(`/api/task/${id}`)
  return data
}

export const createItem = async (name, email, text) => {
  const {data} = await api.post('/api/task/new', {name, email, text})
  return data
}

export const editItem = async (id, completed, text) => {
  const {data} = await apiWithToken.post(`/api/task/edit/${id}`, {completed, text})
  return data
}