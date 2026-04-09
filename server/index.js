import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import roadmapRoutes from './routes/roadmap.js'
import resumeRoutes from './routes/resume.js'
import interviewRoutes from './routes/interview.js'
import jobRoutes from './routes/jobs.js'
import companyRoutes from './routes/company.js'

dotenv.config()

const app = express()

app.use(cors({ 
  origin: 'https://skillpath-ai-nine.vercel.app', // Your Vercel URL
  credentials: true 
}));
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/roadmap', roadmapRoutes)
app.use('/api/resume', resumeRoutes)
app.use('/api/interview', interviewRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/company', companyRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'SkillPath AI Server is running! 🚀' })
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch(err => console.log('MongoDB error:', err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`))
export default app;