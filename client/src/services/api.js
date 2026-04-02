import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// Automatically attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

export const registerUser = (data) => API.post('/auth/register', data)
export const loginUser = (data) => API.post('/auth/login', data)
export const getMe = () => API.get('/auth/me')
export const generateRoadmap = (data) => API.post('/roadmap/generate', data)
export const getRoadmap = () => API.get('/roadmap/get')
export const markWeekComplete = (data) => API.post('/roadmap/complete', data)