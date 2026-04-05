import dotenv from 'dotenv'
dotenv.config()
import OpenAI from 'openai'

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.GEMINI_API_KEY,
})

export const getJobMarketData = async (req, res) => {
  try {
    const { targetRole } = req.query

    const completion = await client.chat.completions.create({
      model: 'google/gemini-2.0-flash-lite-001',
      messages: [
        {
          role: 'user',
          content: `
            You are a job market expert. Generate realistic job market data for: ${targetRole}
            
            Respond ONLY with a valid JSON object (no extra text):
            {
              "analysis": {
                "totalJobs": 1200,
                "avgSalary": "8-15 LPA",
                "marketDemand": "High",
                "topSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
                "topCompanies": ["company1", "company2", "company3", "company4"],
                "insight": "2-3 sentence market insight for this role in India"
              },
              "jobs": [
                {
                  "title": "Job Title",
                  "company": "Company Name",
                  "location": "City, India",
                  "type": "Full Time",
                  "salary": "10-15 LPA",
                  "link": "https://linkedin.com/jobs"
                }
              ]
            }
            
            Generate 6 realistic job listings.
            Make data realistic for Indian job market.
          `
        }
      ]
    })

    const text = completion.choices[0].message.content
    const cleaned = text.replace(/```json|```/g, '').trim()
    const data = JSON.parse(cleaned)

    res.status(200).json(data)

  } catch (err) {
    console.log('JOB MARKET ERROR:', err.message)
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}