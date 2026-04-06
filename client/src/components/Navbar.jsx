import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout, darkMode, toggleDarkMode } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setSidebarOpen(false)
  }

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: '🗂️' },
    { path: '/roadmap', label: 'Roadmap', icon: '🗺️' },
    { path: '/resume', label: 'Resume Checker', icon: '📄' },
    { path: '/interview', label: 'Mock Interview', icon: '🎤' },
    { path: '/jobs', label: 'Job Market', icon: '💼' },
    { path: '/company', label: 'Company Prep', icon: '🏢' },
    { path: '/profile', label: 'Profile', icon: '👤' },
    { path: '/stats', label: 'Statistics', icon: '📊' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Top Navbar */}
      <nav className="glass border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 z-40">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-indigo-500 text-white rounded-lg px-2 py-1 text-sm font-black tracking-wide">
            SP
          </div>
          <span className="text-xl font-black tracking-tight">
            <span className={darkMode ? 'text-white' : 'text-gray-900'}>Skill</span>
            <span className="text-indigo-500">Path</span>
            <span className="text-xs font-bold bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded ml-1">AI</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {user && (
            <span className={`text-sm hidden md:block ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Hey, {user.name} 👋
            </span>
          )}
          <button
            onClick={toggleDarkMode}
            className={`${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-700'} px-3 py-2 rounded-lg text-sm transition`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {user ? (
            <button
              onClick={() => setSidebarOpen(true)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              ☰ Menu
            </button>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-sm transition px-3 py-2`}>
                Login
              </Link>
              <Link to="/register" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm transition">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-72 z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} glass-strong shadow-2xl`}>

        {/* Sidebar Header */}
        <div className={`flex justify-between items-center px-6 py-5 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center gap-2">
            <div className="bg-indigo-500 text-white rounded-lg px-2 py-1 text-sm font-black">SP</div>
            <span className="text-lg font-black">
              <span className={darkMode ? 'text-white' : 'text-gray-900'}>Skill</span>
              <span className="text-indigo-500">Path</span>
              <span className="text-xs font-bold bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded ml-1">AI</span>
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} text-xl transition`}
          >
            ✕
          </button>
        </div>

        {/* User Info */}
        {user && (
          <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav Links */}
        <div className="px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                isActive(link.path)
                  ? 'bg-indigo-500 text-white'
                  : darkMode
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition"
          >
            <span className="text-lg">🚪</span>
            Logout
          </button>
        </div>
      </div>
    </>
  )
}

export default Navbar