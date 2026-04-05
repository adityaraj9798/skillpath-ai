import dotenv from 'dotenv'
dotenv.config()
import OpenAI from 'openai'

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.GEMINI_API_KEY,
})

export const generateRoadmap = async (currentSkills, targetRole) => {
  const completion = await client.chat.completions.create({
    model: 'google/gemini-2.0-flash-lite-001',
    messages: [
      {
        role: 'user',
        content: `
          You are a career counselor and tech mentor.
          
          A student currently knows: ${currentSkills.join(', ')}
          Their target job role is: ${targetRole}
          
          Create a detailed 8-week personalized learning roadmap for them.
          
          Respond ONLY with a valid JSON array like this (no extra text):
          [
            {
              "week": 1,
              "topic": "Topic Name",
              "description": "What to learn and why",
              "resources": ["https://free-resource-1.com", "https://free-resource-2.com"]
            }
          ]
          
          Make sure:
          - Each week builds on the previous
          - Resources are real free websites like youtube, freecodecamp, docs
          - Topics are specific to the skill gap between current skills and target role
          - Return exactly 8 weeks
        `
      }
    ]
  })

  const text = completion.choices[0].message.content
  const cleaned = text.replace(/```json|```/g, '').trim()
  const roadmap = JSON.parse(cleaned)

  return roadmap
}