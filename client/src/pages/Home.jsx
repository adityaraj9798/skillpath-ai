import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { darkMode } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4">
      <div className="mb-6 text-6xl">🎯</div>
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        Your Personal <span className="text-indigo-400">AI Learning</span> Roadmap
      </h1>
      <p className={`text-base md:text-xl max-w-2xl mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Tell us your current skills and dream job — we'll build you a personalized week-by-week learning plan based on real job market data.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/register" className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-xl text-lg font-semibold transition">
          Get Started Free 🚀
        </Link>
        <Link to="/login" className={`border ${darkMode ? 'border-gray-600 text-gray-300 hover:border-gray-400' : 'border-gray-300 text-gray-600 hover:border-gray-500'} px-8 py-3 rounded-xl text-lg transition`}>
          Login
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-3xl w-full">
        {[
          { icon: '🤖', title: 'AI Powered', desc: 'Gemini AI generates your personalized roadmap' },
          { icon: '📊', title: 'Job Market Data', desc: 'Based on real job postings and hiring trends' },
          { icon: '📈', title: 'Track Progress', desc: 'Watch your job readiness % grow week by week' },
        ].map((feature, i) => (
          <div key={i} className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home