import express from 'express'
import { checkResume } from '../controllers/resumeController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/check', authMiddleware, checkResume)

export default router