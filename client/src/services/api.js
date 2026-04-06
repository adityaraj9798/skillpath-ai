import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

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
export const updateProfile = (data) => API.put('/auth/profile', data)
export const generateRoadmap = (data) => API.post('/roadmap/generate', data)
export const getRoadmap = () => API.get('/roadmap/get')
export const markWeekComplete = (data) => API.post('/roadmap/complete', data)
export const checkResume = (data) => API.post('/resume/check', data)
export const startInterview = (data) => API.post('/interview/start', data)
export const submitAnswer = (data) => API.post('/interview/answer', data)
export const getInterviews = () => API.get('/interview/history')
export const getJobMarketData = (targetRole) => API.get(`/jobs/market?targetRole=${targetRole}`)
export const getCompanyPrep = (data) => API.post('/company/prep', data)
export const practiceQuestion = (data) => API.post('/company/practice', data)