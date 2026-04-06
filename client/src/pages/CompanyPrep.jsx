import { useState } from 'react'
import { getCompanyPrep, practiceQuestion } from '../services/api'
import { useAuth } from '../context/AuthContext'

const CompanyPrep = () => {
  const { darkMode } = useAuth()
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [evaluation, setEvaluation] = useState(null)
  const [practicing, setPracticing] = useState(false)

  const card = `${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-xl p-6`

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setData(null)
    setSelectedQuestion(null)
    setEvaluation(null)
    try {
      const res = await getCompanyPrep({ company, role })
      setData(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handlePractice = async () => {
    setPracticing(true)
    setEvaluation(null)
    try {
      const res = await practiceQuestion({
        company,
        role,
        question: selectedQuestion.question,
        userAnswer
      })
      setEvaluation(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setPracticing(false)
    }
  }

  const difficultyColor = (d) => {
    if (d === 'Easy') return 'text-green-400 bg-green-500/10 border-green-500/30'
    if (d === 'Medium') return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
    return 'text-red-400 bg-red-500/10 border-red-500/30'
  }

  const typeColor = (t) => {
    if (t === 'Technical') return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30'
    if (t === 'HR') return 'text-pink-400 bg-pink-500/10 border-pink-500/30'
    return 'text-orange-400 bg-orange-500/10 border-orange-500/30'
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-2">Company Specific Prep 🏢</h2>
      <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Get tailored interview prep for your target company
      </p>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Company (e.g. Google, TCS, Amazon)"
          value={company}
          onChange={e => setCompany(e.target.value)}
          className={`flex-1 ${darkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900'} border rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500`}
          required
        />
        <input
          type="text"
          placeholder="Role (e.g. Full Stack Developer)"
          value={role}
          onChange={e => setRole(e.target.value)}
          className={`flex-1 ${darkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900'} border rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500`}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Prepare 🚀'}
        </button>
      </form>

      {loading && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🏢</div>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Generating {company} specific prep...
          </p>
        </div>
      )}

      {data && (
        <div className="flex flex-col gap-6">

          {/* Company Info */}
          <div className={card}>
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3">
              <div>
                <h3 className="text-2xl font-bold">{data.companyInfo.name}</h3>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{data.companyInfo.about}</p>
              </div>
              <span className={`border px-4 py-2 rounded-full text-sm font-bold ${difficultyColor(data.companyInfo.difficulty)}`}>
                {data.companyInfo.difficulty} Difficulty
              </span>
            </div>

            <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{data.companyInfo.culture}</p>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Interview Rounds</h4>
              <div className="flex flex-wrap gap-2">
                {data.companyInfo.rounds.map((round, i) => (
                  <span key={i} className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-3 py-1 rounded-full text-sm">
                    {round}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Pro Tips</h4>
              <ul className="flex flex-col gap-2">
                {data.companyInfo.tips.map((tip, i) => (
                  <li key={i} className={`text-sm flex gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="text-indigo-400">→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Questions */}
          <div>
            <h3 className="text-xl font-bold mb-4">Interview Questions</h3>
            <div className="flex flex-col gap-3">
              {data.questions.map((q, i) => (
                <div
                  key={i}
                  className={`${card} cursor-pointer hover:border-indigo-500/50 transition ${selectedQuestion === q ? 'border-indigo-500' : ''}`}
                  onClick={() => {
                    setSelectedQuestion(q)
                    setUserAnswer('')
                    setEvaluation(null)
                  }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                    <p className="font-semibold">{q.question}</p>
                    <div className="flex gap-2 shrink-0">
                      <span className={`border px-2 py-1 rounded-full text-xs ${typeColor(q.type)}`}>{q.type}</span>
                      <span className={`border px-2 py-1 rounded-full text-xs ${difficultyColor(q.difficulty)}`}>{q.difficulty}</span>
                    </div>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Hint: {q.hint}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Section */}
          {selectedQuestion && (
            <div className={card}>
              <h3 className="text-xl font-bold mb-2">Practice This Question</h3>
              <p className={`mb-4 font-semibold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                {selectedQuestion.question}
              </p>

              {!evaluation && (
                <div className="flex flex-col gap-4">
                  <textarea
                    placeholder="Type your answer here..."
                    value={userAnswer}
                    onChange={e => setUserAnswer(e.target.value)}
                    rows={5}
                    className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} border rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 resize-none`}
                  />
                  <button
                    onClick={handlePractice}
                    disabled={practicing || !userAnswer}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                  >
                    {practicing ? 'Evaluating...' : 'Submit Answer'}
                  </button>
                </div>
              )}

              {evaluation && (
                <div className="flex flex-col gap-4">
                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-5`}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-green-400">AI Feedback</span>
                      <span className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full font-bold">
                        {evaluation.score}/10
                      </span>
                    </div>
                    <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{evaluation.feedback}</p>
                    <div className="border-t border-gray-700 pt-3 mb-3">
                      <p className="text-yellow-400 text-sm font-semibold mb-1">Improvements</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{evaluation.improvements}</p>
                    </div>
                    <div className="border-t border-gray-700 pt-3">
                      <p className="text-green-400 text-sm font-semibold mb-1">Ideal Answer Outline</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{evaluation.idealAnswer}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setEvaluation(null); setUserAnswer('') }}
                    className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} py-3 rounded-lg font-semibold transition`}
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CompanyPrep