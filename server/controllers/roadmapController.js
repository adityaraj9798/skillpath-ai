import Roadmap from '../models/Roadmap.js'
import { generateRoadmap } from '../utils/geminiHelper.js'

// Generate new roadmap
export const createRoadmap = async (req, res) => {
  try {
    const { currentSkills, targetRole } = req.body
    const userId = req.user.id

    // Generate roadmap using Gemini AI
    const weeks = await generateRoadmap(currentSkills, targetRole)

    // Save to DB
    const roadmap = await Roadmap.create({
      userId,
      targetRole,
      currentSkills,
      weeks,
      jobReadiness: 0
    })

    res.status(201).json({
      message: 'Roadmap generated successfully',
      roadmap
    })

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Get user roadmap
export const getRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ userId: req.user.id }).sort({ createdAt: -1 })

    if (!roadmap) {
      return res.status(404).json({ message: 'No roadmap found' })
    }

    res.status(200).json(roadmap)

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Mark week as completed
export const markWeekComplete = async (req, res) => {
  try {
    const { roadmapId, weekIndex } = req.body

    const roadmap = await Roadmap.findById(roadmapId)

    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' })
    }

    // Mark week complete
    roadmap.weeks[weekIndex].completed = true

    // Calculate job readiness %
    const completedWeeks = roadmap.weeks.filter(w => w.completed).length
    roadmap.jobReadiness = Math.round((completedWeeks / roadmap.weeks.length) * 100)

    await roadmap.save()

    res.status(200).json({
      message: 'Week marked as complete',
      jobReadiness: roadmap.jobReadiness,
      roadmap
    })

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}