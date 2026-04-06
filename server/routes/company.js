import express from 'express'
import { getCompanyPrep, practiceQuestion } from '../controllers/companyController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/prep', authMiddleware, getCompanyPrep)
router.post('/practice', authMiddleware, practiceQuestion)

export default router