import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateRoadmap } from '../services/api'

const Dashboard = () => {
  const [skills, setSkills] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const currentSkills = skills.split(',').map(s => s.trim())
      await generateRoadmap({ currentSkills, targetRole })
      navigate('/roadmap')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[90vh] px-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-2">Generate Your Roadmap 🗺️</h2>
        <p className="text-gray-400 mb-6">Tell us your skills and target role</p>
        {error && <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Current Skills (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. HTML, CSS, JavaScript, React"
              value={skills}
              onChange={e => setSkills(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
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
            {loading ? 'Generating your roadmap...' : 'Generate Roadmap 🚀'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Dashboard