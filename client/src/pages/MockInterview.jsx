import { useState } from 'react'
import { startInterview, submitAnswer } from '../services/api'

const MockInterview = () => {
  const [targetRole, setTargetRole] = useState('')
  const [interview, setInterview] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [evaluation, setEvaluation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [finished, setFinished] = useState(false)

  const handleStart = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await startInterview({ targetRole })
      setInterview(res.data.interview)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitAnswer = async () => {
    setSubmitting(true)
    setEvaluation(null)
    try {
      const res = await submitAnswer({
        interviewId: interview._id,
        questionIndex: currentQuestion,
        userAnswer
      })
      setEvaluation(res.data.evaluation)
      setInterview(res.data.interview)
      if (res.data.isCompleted) {
        setFinished(true)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleNext = () => {
    setCurrentQuestion(prev => prev + 1)
    setUserAnswer('')
    setEvaluation(null)
  }

  // Start Screen
  if (!interview) {
    return (
      <div className="flex items-center justify-center min-h-[90vh] px-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-lg">
          <h2 className="text-3xl font-bold mb-2">AI Mock Interview 🎤</h2>
          <p className="text-gray-400 mb-6">Practice interviews with AI and get instant feedback</p>
          <form onSubmit={handleStart} className="flex flex-col gap-4">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Target Job Role</label>
              <input
                type="text"
                placeholder="e.g. Full Stack Developer, Data Scientist"
                value={targetRole}
                onChange={e => setTargetRole(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? 'Generating Questions...' : 'Start Interview 🚀'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Finished Screen
  if (finished) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold mb-2">Interview Complete!</h2>
          <p className="text-gray-400 mb-4">Overall Score</p>
          <div className="text-7xl font-bold text-indigo-400 mb-2">{interview.overallScore}<span className="text-3xl">/10</span></div>
          <div className="w-full bg-gray-800 rounded-full h-4 mt-4">
            <div
              className="bg-indigo-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${interview.overallScore * 10}%` }}
            />
          </div>
        </div>

        <h3 className="text-xl font-bold mb-4">Question Review 📝</h3>
        <div className="flex flex-col gap-4">
          {interview.questions.map((q, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-start mb-2">
                <span className="text-indigo-400 text-sm font-semibold">Question {i + 1}</span>
                <span className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-sm font-bold">{q.score}/10</span>
              </div>
              <p className="text-white font-semibold mb-2">{q.question}</p>
              <p className="text-gray-400 text-sm mb-2"><span className="text-gray-500">Your Answer:</span> {q.userAnswer}</p>
              <p className="text-green-400 text-sm">{q.feedback}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => { setInterview(null); setFinished(false); setCurrentQuestion(0) }}
          className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-semibold transition"
        >
          Start New Interview 🔄
        </button>
      </div>
    )
  }

  // Interview Screen
  const question = interview.questions[currentQuestion]

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Question {currentQuestion + 1} of {interview.questions.length}</span>
          <span className="text-indigo-400">{interview.targetRole}</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="bg-indigo-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / interview.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-6">
        <div className="text-indigo-400 text-sm font-semibold mb-3">🎤 Interviewer</div>
        <p className="text-xl font-semibold text-white">{question.question}</p>
      </div>

      {/* Answer */}
      {!evaluation && (
        <div className="flex flex-col gap-4">
          <textarea
            placeholder="Type your answer here..."
            value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
            rows={6}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
          />
          <button
            onClick={handleSubmitAnswer}
            disabled={submitting || !userAnswer}
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {submitting ? 'Evaluating...' : 'Submit Answer 📤'}
          </button>
        </div>
      )}

      {/* Feedback */}
      {evaluation && (
        <div className="flex flex-col gap-4">
          <div className="bg-gray-900 border border-green-500/30 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-green-400 font-semibold">AI Feedback</span>
              <span className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full font-bold">{evaluation.score}/10</span>
            </div>
            <p className="text-gray-300 text-sm mb-3">{evaluation.feedback}</p>
            <div className="border-t border-gray-800 pt-3">
              <p className="text-yellow-400 text-sm font-semibold mb-1">💡 Improvements</p>
              <p className="text-gray-400 text-sm">{evaluation.improvements}</p>
            </div>
          </div>

          {currentQuestion < interview.questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Next Question →
            </button>
          ) : (
            <button
              onClick={() => setFinished(true)}
              className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition"
            >
              See Final Results 🎉
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default MockInterview