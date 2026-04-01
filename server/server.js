import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import roadmapRoutes from './routes/roadmap.js'

dotenv.config()

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/roadmap', roadmapRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'SkillPath AI Server is running! 🚀' })
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch(err => console.log('MongoDB error:', err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`))
