import dotenv from 'dotenv'
dotenv.config()
import OpenAI from 'openai'

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.GEMINI_API_KEY,
})

// Get company info + questions
export const getCompanyPrep = async (req, res) => {
  try {
    const { company, role } = req.body

    const completion = await client.chat.completions.create({
      model: 'google/gemini-2.0-flash-lite-001',
      messages: [
        {
          role: 'user',
          content: `
            You are a career expert with deep knowledge of tech companies.
            
            Company: ${company}
            Role: ${role}
            
            Generate detailed interview preparation data.
            
            Respond ONLY with a valid JSON object (no extra text):
            {
              "companyInfo": {
                "name": "${company}",
                "about": "2-3 sentences about the company",
                "culture": "2-3 sentences about work culture",
                "difficulty": "Easy/Medium/Hard",
                "rounds": ["Round 1", "Round 2", "Round 3"],
                "tips": ["tip1", "tip2", "tip3", "tip4"]
              },
              "questions": [
                {
                  "question": "Interview question here",
                  "type": "Technical/HR/Aptitude",
                  "difficulty": "Easy/Medium/Hard",
                  "hint": "Hint for answering this question"
                }
              ]
            }
            
            Generate 8 questions mix of technical, HR and aptitude.
            Make it specific to ${company} interview process.
          `
        }
      ]
    })

    const text = completion.choices[0].message.content
    const cleaned = text.replace(/```json|```/g, '').trim()
    const data = JSON.parse(cleaned)

    res.status(200).json(data)

  } catch (err) {
    console.log('COMPANY PREP ERROR:', err.message)
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Practice a specific question
export const practiceQuestion = async (req, res) => {
  try {
    const { company, question, userAnswer, role } = req.body

    const completion = await client.chat.completions.create({
      model: 'google/gemini-2.0-flash-lite-001',
      messages: [
        {
          role: 'user',
          content: `
            You are a senior interviewer at ${company}.
            
            Role: ${role}
            Question: ${question}
            Candidate Answer: ${userAnswer}
            
            Evaluate strictly like a ${company} interviewer.
            
            Respond ONLY with valid JSON (no extra text):
            {
              "score": 7,
              "feedback": "Detailed feedback",
              "improvements": "What could be better",
              "idealAnswer": "Brief ideal answer outline"
            }
            
            Score from 1-10. Be honest and strict like ${company} standards.
          `
        }
      ]
    })

    const text = completion.choices[0].message.content
    const cleaned = text.replace(/```json|```/g, '').trim()
    const evaluation = JSON.parse(cleaned)

    res.status(200).json(evaluation)

  } catch (err) {
    console.log('PRACTICE ERROR:', err.message)
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}