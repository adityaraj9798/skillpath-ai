import express from 'express'
import { startInterview, submitAnswer, getInterviews } from '../controllers/interviewController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/start', authMiddleware, startInterview)
router.post('/answer', authMiddleware, submitAnswer)
router.get('/history', authMiddleware, getInterviews)

export default router