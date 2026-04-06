import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getRoadmap, getInterviews } from '../services/api'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, PieChart, Pie, Cell
} from 'recharts'

const Statistics = () => {
  const { darkMode } = useAuth()
  const [roadmap, setRoadmap] = useState(null)
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getRoadmap().catch(() => null),
      getInterviews().catch(() => [])
    ]).then(([roadmapRes, interviewsRes]) => {
      setRoadmap(roadmapRes?.data || null)
      setInterviews(interviewsRes?.data || [])
    }).finally(() => setLoading(false))
  }, [])

  const card = `${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-xl p-6`
  const textMuted = darkMode ? 'text-gray-400' : 'text-gray-500'

  // Roadmap progress data
  const roadmapData = roadmap?.weeks?.map(week => ({
    name: `W${week.week}`,
    status: week.completed ? 1 : 0
  })) || []

  // Interview scores data
  const interviewData = interviews.map((interview, i) => ({
    name: `Interview ${i + 1}`,
    score: interview.overallScore,
    role: interview.targetRole
  }))

  // Skills radar data
  const skillsData = roadmap?.currentSkills?.map(skill => ({
    skill: skill,
    level: Math.floor(Math.random() * 40) + 60
  })) || [
    { skill: 'Frontend', level: 75 },
    { skill: 'Backend', level: 60 },
    { skill: 'Database', level: 55 },
    { skill: 'DevOps', level: 40 },
    { skill: 'DSA', level: 65 },
  ]

  // Completion pie data
  const completedWeeks = roadmap?.weeks?.filter(w => w.completed).length || 0
  const pendingWeeks = (roadmap?.weeks?.length || 0) - completedWeeks
  const pieData = [
    { name: 'Completed', value: completedWeeks },
    { name: 'Pending', value: pendingWeeks }
  ]
  const COLORS = ['#6366f1', '#374151']

  const avgInterviewScore = interviews.length > 0
    ? Math.round(interviews.reduce((sum, i) => sum + i.overallScore, 0) / interviews.length)
    : 0

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-gray-400">Loading stats...</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-2">Placement Statistics 📊</h2>
      <p className={`mb-8 ${textMuted}`}>Track your placement preparation progress</p>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className={card + ' text-center'}>
          <div className="text-4xl font-bold text-indigo-400 mb-1">{roadmap?.jobReadiness || 0}%</div>
          <div className={`text-sm ${textMuted}`}>Job Readiness</div>
        </div>
        <div className={card + ' text-center'}>
          <div className="text-4xl font-bold text-green-400 mb-1">{completedWeeks}</div>
          <div className={`text-sm ${textMuted}`}>Weeks Done</div>
        </div>
        <div className={card + ' text-center'}>
          <div className="text-4xl font-bold text-yellow-400 mb-1">{interviews.length}</div>
          <div className={`text-sm ${textMuted}`}>Interviews</div>
        </div>
        <div className={card + ' text-center'}>
          <div className="text-4xl font-bold text-pink-400 mb-1">{avgInterviewScore}/10</div>
          <div className={`text-sm ${textMuted}`}>Avg Score</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        {/* Roadmap Progress Bar Chart */}
        <div className={card}>
          <h3 className="text-lg font-bold mb-4">Roadmap Progress</h3>
          {roadmap ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={roadmapData}>
                <XAxis dataKey="name" stroke={darkMode ? '#6b7280' : '#9ca3af'} fontSize={12} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? '#1f2937' : '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    color: darkMode ? '#fff' : '#111'
                  }}
                />
                <Bar dataKey="status" fill="#6366f1" radius={[4, 4, 0, 0]}
                  label={{ position: 'top', formatter: (v) => v === 1 ? '✅' : '', fontSize: 10 }}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className={`flex items-center justify-center h-48 ${textMuted}`}>
              Generate a roadmap first!
            </div>
          )}
        </div>

        {/* Completion Pie Chart */}
        <div className={card}>
          <h3 className="text-lg font-bold mb-4">Completion Status</h3>
          {roadmap ? (
            <div className="flex items-center justify-center gap-8">
              <ResponsiveContainer width="60%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-500" />
                  <span className={`text-sm ${textMuted}`}>Completed: {completedWeeks}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-700" />
                  <span className={`text-sm ${textMuted}`}>Pending: {pendingWeeks}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className={`flex items-center justify-center h-48 ${textMuted}`}>
              Generate a roadmap first!
            </div>
          )}
        </div>

        {/* Interview Scores Line Chart */}
        <div className={card}>
          <h3 className="text-lg font-bold mb-4">Interview Score History</h3>
          {interviews.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={interviewData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="name" stroke={darkMode ? '#6b7280' : '#9ca3af'} fontSize={12} />
                <YAxis domain={[0, 10]} stroke={darkMode ? '#6b7280' : '#9ca3af'} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? '#1f2937' : '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    color: darkMode ? '#fff' : '#111'
                  }}
                />
                <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className={`flex items-center justify-center h-48 ${textMuted}`}>
              Take a mock interview first!
            </div>
          )}
        </div>

        {/* Skills Radar Chart */}
        <div className={card}>
          <h3 className="text-lg font-bold mb-4">Skills Radar</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={skillsData}>
              <PolarGrid stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <PolarAngleAxis dataKey="skill" stroke={darkMode ? '#6b7280' : '#9ca3af'} fontSize={11} />
              <Radar dataKey="level" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Interview History Table */}
      {interviews.length > 0 && (
        <div className={card}>
          <h3 className="text-lg font-bold mb-4">Interview History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={`${darkMode ? 'text-gray-400 border-gray-800' : 'text-gray-500 border-gray-200'} border-b`}>
                  <th className="text-left py-3 px-2">Role</th>
                  <th className="text-left py-3 px-2">Date</th>
                  <th className="text-left py-3 px-2">Score</th>
                  <th className="text-left py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {interviews.map((interview, i) => (
                  <tr key={i} className={`${darkMode ? 'border-gray-800' : 'border-gray-100'} border-b`}>
                    <td className="py-3 px-2 font-medium">{interview.targetRole}</td>
                    <td className={`py-3 px-2 ${textMuted}`}>{new Date(interview.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-2">
                      <span className="bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded-full font-bold">
                        {interview.overallScore}/10
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${interview.completed ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {interview.completed ? 'Completed' : 'In Progress'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  )
}

export default Statistics