import express from 'express'
import { createRoadmap, getRoadmap, markWeekComplete } from '../controllers/roadmapController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/generate', authMiddleware, createRoadmap)
router.get('/get', authMiddleware, getRoadmap)
router.post('/complete', authMiddleware, markWeekComplete)

export default router