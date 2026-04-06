import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout, darkMode, toggleDarkMode } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  const linkClass = `${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition text-sm`

  return (
    <nav className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-500">
          SkillPath <span className={darkMode ? 'text-white' : 'text-gray-900'}>AI</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          {user ? (
            <>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Hey, {user.name}</span>
              <Link to="/dashboard" className={linkClass}>Dashboard</Link>
              <Link to="/roadmap" className={linkClass}>Roadmap</Link>
              <Link to="/resume" className={linkClass}>Resume</Link>
              <Link to="/interview" className={linkClass}>Interview</Link>
              <Link to="/jobs" className={linkClass}>Jobs</Link>
              <Link to="/profile" className={linkClass}>Profile</Link>
              <Link to="/company" className={linkClass}>Company Prep</Link>
              <button onClick={toggleDarkMode} className={`${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-700'} px-3 py-2 rounded-lg text-sm transition`}>
                {darkMode ? '☀️' : '🌙'}
              </button>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={toggleDarkMode} className={`${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-700'} px-3 py-2 rounded-lg text-sm transition`}>
                {darkMode ? '☀️' : '🌙'}
              </button>
              <Link to="/login" className={linkClass}>Login</Link>
              <Link to="/register" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm transition">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={toggleDarkMode} className={`${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-700'} px-3 py-2 rounded-lg text-sm transition`}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`${darkMode ? 'text-white' : 'text-gray-900'} text-2xl`}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className={`md:hidden mt-4 flex flex-col gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {user ? (
            <>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Hey, {user.name} 👋</span>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className={linkClass}>Dashboard</Link>
              <Link to="/roadmap" onClick={() => setMenuOpen(false)} className={linkClass}>Roadmap</Link>
              <Link to="/resume" onClick={() => setMenuOpen(false)} className={linkClass}>Resume</Link>
              <Link to="/interview" onClick={() => setMenuOpen(false)} className={linkClass}>Interview</Link>
              <Link to="/jobs" onClick={() => setMenuOpen(false)} className={linkClass}>Jobs</Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className={linkClass}>Profile</Link>
              <Link to="/company" className={linkClass}>Company Prep</Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm text-left">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className={linkClass}>Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm">
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar