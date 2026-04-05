import express from 'express'
import { getJobMarketData } from '../controllers/jobController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/market', authMiddleware, getJobMarketData)

export default router