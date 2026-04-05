import dotenv from 'dotenv'
dotenv.config()
import OpenAI from 'openai'

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.GEMINI_API_KEY,
})

export const checkResume = async (req, res) => {
  try {
    const { resumeText, targetRole } = req.body

    const completion = await client.chat.completions.create({
      model: 'google/gemini-2.0-flash-lite-001',
      messages: [
        {
          role: 'user',
          content: `
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
          `
        }
      ]
    })

    const text = completion.choices[0].message.content
    const cleaned = text.replace(/```json|```/g, '').trim()
    const analysis = JSON.parse(cleaned)

    res.status(200).json(analysis)

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}