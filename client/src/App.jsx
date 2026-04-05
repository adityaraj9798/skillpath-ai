import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Roadmap from './pages/Roadmap'
import ResumeChecker from './pages/ResumeChecker'
import MockInterview from './pages/MockInterview'
import JobMarket from './pages/JobMarket'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>
  return user ? children : <Navigate to="/login" />
}

function App() {
  const { darkMode } = useAuth()

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/roadmap" element={<PrivateRoute><Roadmap /></PrivateRoute>} />
        <Route path="/resume" element={<PrivateRoute><ResumeChecker /></PrivateRoute>} />
        <Route path="/interview" element={<PrivateRoute><MockInterview /></PrivateRoute>} />
        <Route path="/jobs" element={<PrivateRoute><JobMarket /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </div>
  )
}

export default App