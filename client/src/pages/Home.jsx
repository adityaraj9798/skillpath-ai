import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { darkMode } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4">
      <div className="mb-6 text-6xl">🎯</div>
      <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
        Your Personal
        <span className="block text-indigo-400">AI Learning Roadmap</span>
      </h1>
      <p className={`text-lg md:text-xl max-w-2xl mb-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Tell us your current skills and dream job — we'll build you a personalized week-by-week learning plan based on real job market data.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <Link to="/register" className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition">
          Get Started Free 🚀
        </Link>
        <Link to="/login" className={`border ${darkMode ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-600'} px-8 py-4 rounded-xl text-lg transition`}>
          Login
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full">
        {[
          { icon: '🤖', title: 'AI Powered', desc: 'Gemini AI generates your personalized roadmap instantly' },
          { icon: '📊', title: 'Job Market Data', desc: 'Based on real job postings and current hiring trends' },
          { icon: '📈', title: 'Track Progress', desc: 'Watch your job readiness % grow week by week' },
          { icon: '🎤', title: 'Mock Interviews', desc: 'Practice with AI interviewer and get instant feedback' },
          { icon: '🏢', title: 'Company Prep', desc: 'Get tailored prep for Google, Amazon, TCS and more' },
          { icon: '📄', title: 'Resume Checker', desc: 'AI analyzes your resume and finds skill gaps instantly' },
        ].map((feature, i) => (
          <div key={i} className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6 text-left`}>
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home