import axios from 'axios'

const api = axios.create({
  baseURL: '/api', // Proxy requests through Vite's dev server
})

export const createShortUrl = async (urlData) => {
  const response = await api.post('/urls/', urlData) // Verify this line
  return response.data
}

export const getAllUrls = async () => {
  const response = await api.get('/urls/')
  return response.data
}

export const updateUrl = async (shortCode, urlData) => {
  const response = await api.patch(`/urls/${shortCode}`, urlData)
  return response.data
}

export const deleteUrl = async (shortCode) => {
  const response = await api.delete(`/urls/${shortCode}`)
  return response.data
}
