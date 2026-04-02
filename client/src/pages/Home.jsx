import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4">
      <div className="mb-6 text-indigo-400 text-6xl">🎯</div>
      <h1 className="text-5xl font-bold mb-4">
        Your Personal <span className="text-indigo-400">AI Learning</span> Roadmap
      </h1>
      <p className="text-gray-400 text-xl max-w-2xl mb-8">
        Tell us your current skills and dream job — we'll build you a personalized week-by-week learning plan based on real job market data.
      </p>
      <div className="flex gap-4">
        <Link
          to="/register"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-xl text-lg font-semibold transition"
        >
          Get Started Free 🚀
        </Link>
        <Link
          to="/login"
          className="border border-gray-600 hover:border-gray-400 text-gray-300 px-8 py-3 rounded-xl text-lg transition"
        >
          Login
        </Link>
      </div>
      <div className="mt-16 grid grid-cols-3 gap-8 text-left max-w-3xl">
        {[
          { icon: '🤖', title: 'AI Powered', desc: 'Gemini AI generates your personalized roadmap' },
          { icon: '📊', title: 'Job Market Data', desc: 'Based on real job postings and hiring trends' },
          { icon: '📈', title: 'Track Progress', desc: 'Watch your job readiness % grow week by week' },
        ].map((feature, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home