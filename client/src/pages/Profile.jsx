import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { updateProfile, getRoadmap, getInterviews } from '../services/api'

const Profile = () => {
  const { user, setUser, darkMode } = useAuth()
  const [form, setForm] = useState({ name: '', targetRole: '', skills: '' })
  const [roadmap, setRoadmap] = useState(null)
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        targetRole: user.targetRole || '',
        skills: user.skills?.join(', ') || ''
      })
    }
    getRoadmap().then(r => setRoadmap(r.data)).catch(() => {})
    getInterviews().then(r => setInterviews(r.data)).catch(() => {})
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    try {
      const res = await updateProfile({
        name: form.name,
        targetRole: form.targetRole,
        skills: form.skills.split(',').map(s => s.trim())
      })
      setUser(res.data.user)
      setSuccess('Profile updated successfully!')
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const card = `${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-xl p-6`

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8">Your Profile 👤</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className={card + ' text-center'}>
          <div className="text-4xl font-bold text-indigo-400 mb-1">
            {roadmap ? roadmap.jobReadiness + '%' : '0%'}
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Job Readiness</div>
        </div>
        <div className={card + ' text-center'}>
          <div className="text-4xl font-bold text-green-400 mb-1">
            {roadmap ? roadmap.weeks.filter(w => w.completed).length : 0}
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Weeks Completed</div>
        </div>
        <div className={card + ' text-center'}>
          <div className="text-4xl font-bold text-yellow-400 mb-1">
            {interviews.length}
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Interviews Taken</div>
        </div>
      </div>

      <div className={card}>
        <h3 className="text-xl font-bold mb-6">Edit Profile</h3>

        {success && (
          <div className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className={`text-sm mb-1 block ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} border rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500`}
            />
          </div>
          <div>
            <label className={`text-sm mb-1 block ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Target Role</label>
            <input
              type="text"
              value={form.targetRole}
              onChange={e => setForm({ ...form, targetRole: e.target.value })}
              placeholder="e.g. Full Stack Developer"
              className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} border rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500`}
            />
          </div>
          <div>
            <label className={`text-sm mb-1 block ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Current Skills (comma separated)</label>
            <input
              type="text"
              value={form.skills}
              onChange={e => setForm({ ...form, skills: e.target.value })}
              placeholder="e.g. HTML, CSS, JavaScript"
              className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} border rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500`}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>

        {interviews.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Interview History</h3>
            <div className="flex flex-col gap-3">
              {interviews.map((interview, i) => (
                <div key={i} className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg px-4 py-3 flex justify-between items-center`}>
                  <div>
                    <p className="font-semibold">{interview.targetRole}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {new Date(interview.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-indigo-400 font-bold text-lg">
                    {interview.overallScore}/10
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile