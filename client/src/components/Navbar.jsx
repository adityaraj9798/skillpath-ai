import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout, darkMode, toggleDarkMode } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b px-6 py-4 flex justify-between items-center`}>
      <Link to="/" className="text-2xl font-bold text-indigo-500">
        SkillPath <span className={darkMode ? 'text-white' : 'text-gray-900'}>AI</span>
      </Link>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <Link to="/dashboard" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition text-sm`}>Dashboard</Link>
            <Link to="/roadmap" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition text-sm`}>Roadmap</Link>
            <Link to="/resume" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition text-sm`}>Resume</Link>
            <Link to="/interview" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition text-sm`}>Interview</Link>
            <Link to="/jobs" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition text-sm`}>Jobs</Link>
            <Link to="/profile" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition text-sm`}>Profile</Link>

            {/* Dark/Light Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-700'} px-3 py-2 rounded-lg text-sm transition`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={toggleDarkMode}
              className={`${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-700'} px-3 py-2 rounded-lg text-sm transition`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <Link to="/login" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition`}>Login</Link>
            <Link to="/register" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm transition">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar