import dotenv from 'dotenv'
dotenv.config()
import OpenAI from 'openai'
import Interview from '../models/Interview.js'

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.GEMINI_API_KEY,
})

// Generate interview questions
export const startInterview = async (req, res) => {
  try {
    const { targetRole } = req.body
    const userId = req.user.id

    const completion = await client.chat.completions.create({
      model: 'google/gemini-2.0-flash-lite-001',
      messages: [
        {
          role: 'user',
          content: `
            You are a senior tech interviewer at a top company.
            Generate 5 interview questions for a ${targetRole} position.
            Mix of technical and behavioral questions.
            
            Respond ONLY with a valid JSON array (no extra text):
            [
              {
                "question": "Your question here",
                "type": "technical or behavioral"
              }
            ]
            
            Make questions specific and challenging but fair for entry level.
          `
        }
      ]
    })

    const text = completion.choices[0].message.content
    const cleaned = text.replace(/```json|```/g, '').trim()
    const questions = JSON.parse(cleaned)

    const interview = await Interview.create({
      userId,
      targetRole,
      questions: questions.map(q => ({ question: q.question })),
      overallScore: 0,
      completed: false
    })

    res.status(201).json({ interview })

  } catch (err) {
    console.log('INTERVIEW ERROR:', err.message)
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Submit answer for a question
export const submitAnswer = async (req, res) => {
  try {
    const { interviewId, questionIndex, userAnswer } = req.body

    const interview = await Interview.findById(interviewId)
    if (!interview) return res.status(404).json({ message: 'Interview not found' })

    const question = interview.questions[questionIndex].question

    const completion = await client.chat.completions.create({
      model: 'google/gemini-2.0-flash-lite-001',
      messages: [
        {
          role: 'user',
          content: `
            You are a senior tech interviewer evaluating an answer.
            
            Role: ${interview.targetRole}
            Question: ${question}
            Candidate's Answer: ${userAnswer}
            
            Evaluate the answer and respond ONLY with a valid JSON object (no extra text):
            {
              "score": 7,
              "feedback": "Detailed feedback on the answer",
              "improvements": "What could be better"
            }
            
            Score should be from 1-10.
            Be honest but constructive.
          `
        }
      ]
    })

    const text = completion.choices[0].message.content
    const cleaned = text.replace(/```json|```/g, '').trim()
    const evaluation = JSON.parse(cleaned)

    interview.questions[questionIndex].userAnswer = userAnswer
    interview.questions[questionIndex].feedback = `${evaluation.feedback} | Improvements: ${evaluation.improvements}`
    interview.questions[questionIndex].score = evaluation.score

    // Check if all questions answered
    const answeredQuestions = interview.questions.filter(q => q.userAnswer)
    if (answeredQuestions.length === interview.questions.length) {
      const totalScore = interview.questions.reduce((sum, q) => sum + q.score, 0)
      interview.overallScore = Math.round(totalScore / interview.questions.length)
      interview.completed = true
    }

    await interview.save()

    res.status(200).json({
      evaluation,
      interview,
      isCompleted: interview.completed,
      overallScore: interview.overallScore
    })

  } catch (err) {
    console.log('SUBMIT ANSWER ERROR:', err.message)
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Get interview history
export const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ userId: req.user.id }).sort({ createdAt: -1 })
    res.status(200).json(interviews)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}