import { useState } from 'react'
import { checkResume } from '../services/api'

const ResumeChecker = () => {
  const [resumeText, setResumeText] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await checkResume({ resumeText, targetRole })
      setResult(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-2">Resume Gap Checker 📄</h2>
      <p className="text-gray-400 mb-6">Paste your resume and we'll tell you exactly what's missing for your dream role</p>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
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
        <div>
          <label className="text-gray-400 text-sm mb-1 block">Paste Your Resume Text</label>
          <textarea
            placeholder="Paste your entire resume content here..."
            value={resumeText}
            onChange={e => setResumeText(e.target.value)}
            rows={10}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? 'Analyzing your resume...' : 'Analyze Resume 🔍'}
        </button>
      </form>

      {result && (
        <div className="flex flex-col gap-6">

          {/* Match Score */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">Match Score</h3>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold text-indigo-400">{result.matchScore}%</div>
              <div className="flex-1">
                <div className="w-full bg-gray-800 rounded-full h-4">
                  <div
                    className="bg-indigo-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: result.matchScore + '%' }}
                  />
                </div>
                <p className="text-gray-400 text-sm mt-2">{result.summary}</p>
              </div>
            </div>
          </div>

          {/* Strong Skills */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-green-400">✅ Strong Skills</h3>
            <div className="flex flex-wrap gap-2">
              {result.strongSkills.map((skill, i) => (
                <span key={i} className="bg-green-500/10 border border-green-500/30 text-green-400 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-red-400">❌ Missing Skills</h3>
            <div className="flex flex-wrap gap-2">
              {result.missingSkills.map((skill, i) => (
                <span key={i} className="bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-yellow-400">💡 Suggestions</h3>
            <ul className="flex flex-col gap-2">
              {result.suggestions.map((suggestion, i) => (
                <li key={i} className="text-gray-300 text-sm flex gap-2">
                  <span className="text-yellow-400">→</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  )
}

export default ResumeChecker