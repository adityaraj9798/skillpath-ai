import dotenv from 'dotenv'
dotenv.config()
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const checkResume = async (req, res) => {
  try {
    const { resumeText, targetRole } = req.body

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const prompt = `
      You are an expert tech recruiter and career coach.
      
      A candidate is applying for: ${targetRole}
      
      Their resume content is:
      ${resumeText}
      
      Analyze the resume and respond ONLY with a valid JSON object like this (no extra text):
      {
        "matchScore": 75,
        "strongSkills": ["skill1", "skill2"],
        "missingSkills": ["skill1", "skill2"],
        "suggestions": ["suggestion1", "suggestion2"],
        "summary": "Brief overall assessment in 2-3 sentences"
      }
      
      Make sure:
      - matchScore is a number from 0-100
      - strongSkills are skills found in resume that match the role
      - missingSkills are important skills for the role that are missing
      - suggestions are specific actionable improvements
    `

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const cleaned = text.replace(/```json|```/g, '').trim()
    const analysis = JSON.parse(cleaned)

    res.status(200).json(analysis)

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}