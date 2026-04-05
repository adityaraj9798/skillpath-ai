import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-indigo-400">
        SkillPath <span className="text-white">AI</span>
      </Link>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-gray-400 text-sm">Hey, {user.name} 👋</span>
            <Link to="/dashboard" className="text-gray-300 hover:text-white transition">Dashboard</Link>
            <Link to="/roadmap" className="text-gray-300 hover:text-white transition">Roadmap</Link>
            <Link to="/resume" className="text-gray-300 hover:text-white transition">Resume</Link>
            <Link to="/interview" className="text-gray-300 hover:text-white transition">Mock Interview</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-300 hover:text-white transition">Login</Link>
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