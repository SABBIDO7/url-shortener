import axios from 'axios'

const api = axios.create({
  baseURL: '/api', // Proxy requests through Vite's dev server
})

export const createShortUrl = async (urlData) => {
  const response = await api.post('/urls/', urlData)
  return response.data
}

export const getAllUrls = async () => {
  const response = await api.get('/urls/')
  return response.data
}

export const updateUrl = async (id, urlData) => {
  const response = await api.patch(`/urls/${id}`, urlData)
  return response.data
}

export const deleteUrl = async (id) => {
  const response = await api.delete(`/urls/${id}`)
  return response.data
}
