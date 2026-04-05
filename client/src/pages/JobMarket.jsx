import { useState } from 'react'
import { getJobMarketData } from '../services/api'

const JobMarket = () => {
  const [targetRole, setTargetRole] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setData(null)
    try {
      const res = await getJobMarketData(targetRole)
      setData(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-2">Job Market Data</h2>
      <p className="text-gray-400 mb-6">Real job market insights for your target role</p>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="e.g. Full Stack Developer"
          value={targetRole}
          onChange={e => setTargetRole(e.target.value)}
          className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && (
        <div className="text-center py-20">
          <p className="text-gray-400">Fetching real job market data...</p>
        </div>
      )}

      {data && (
        <div className="flex flex-col gap-6">

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-indigo-400 mb-1">{data.analysis.totalJobs}+</div>
              <div className="text-gray-400 text-sm">Jobs Available</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-green-400 mb-1">{data.analysis.avgSalary}</div>
              <div className="text-gray-400 text-sm">Average Salary</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-1">{data.analysis.marketDemand}</div>
              <div className="text-gray-400 text-sm">Market Demand</div>
            </div>
          </div>

          <div className="bg-gray-900 border border-indigo-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2 text-indigo-400">Market Insight</h3>
            <p className="text-gray-300">{data.analysis.insight}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">Top Skills Demanded</h3>
              <div className="flex flex-wrap gap-2">
                {data.analysis.topSkills.map((skill, i) => (
                  <span key={i} className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">Top Companies Hiring</h3>
              <div className="flex flex-col gap-2">
                {data.analysis.topCompanies.map((company, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-indigo-400">-</span>
                    <span className="text-gray-300">{company}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Live Job Listings</h3>
            <div className="grid grid-cols-2 gap-4">
              {data.jobs.map((job, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                  <h4 className="font-semibold text-white mb-2">{job.title}</h4>
                  <p className="text-gray-400 text-sm mb-1">{job.company}</p>
                  <p className="text-gray-400 text-sm mb-1">{job.location}</p>
                  <p className="text-green-400 text-sm mb-3">{job.salary}</p>
                  
                    <a
                    href={job.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg transition inline-block">
                    Apply Now
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default JobMarket