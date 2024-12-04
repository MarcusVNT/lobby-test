import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

api.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY
    config.headers.Authorization = `Basic ${btoa(`${apiKey}:`)}`
  }
  return config
})
