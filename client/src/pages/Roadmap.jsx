import { useEffect, useState } from 'react'
import { getRoadmap, markWeekComplete } from '../services/api'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const Roadmap = () => {
  const [roadmap, setRoadmap] = useState(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    getRoadmap()
      .then(r => setRoadmap(r.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  const handleComplete = async (weekIndex) => {
    try {
      const result = await markWeekComplete({ roadmapId: roadmap._id, weekIndex })
      setRoadmap(result.data.roadmap)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDownloadPDF = () => {
  setDownloading(true)
  try {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    let y = 20

    pdf.setFontSize(22)
    pdf.setTextColor(99, 102, 241)
    pdf.text('SkillPath AI - Learning Roadmap', pageWidth / 2, y, { align: 'center' })
    y += 10

    pdf.setFontSize(14)
    pdf.setTextColor(100, 100, 100)
    pdf.text(`Target Role: ${roadmap.targetRole}`, pageWidth / 2, y, { align: 'center' })
    y += 8

    pdf.setFontSize(12)
    pdf.text(`Job Readiness: ${roadmap.jobReadiness}%`, pageWidth / 2, y, { align: 'center' })
    y += 12

    roadmap.weeks.forEach((week) => {
      if (y > 260) {
        pdf.addPage()
        y = 20
      }

      pdf.setFillColor(30, 30, 47)
      pdf.roundedRect(10, y, pageWidth - 20, 8, 2, 2, 'F')
      pdf.setFontSize(12)
      pdf.setTextColor(99, 102, 241)
      pdf.text(`Week ${week.week}: ${week.topic}`, 15, y + 5.5)
      y += 12

      pdf.setFontSize(10)
      pdf.setTextColor(150, 150, 150)
      const descLines = pdf.splitTextToSize(week.description, pageWidth - 30)
      pdf.text(descLines, 15, y)
      y += descLines.length * 5 + 3

      pdf.setTextColor(99, 102, 241)
      pdf.text(`Status: ${week.completed ? 'Completed' : 'Pending'}`, 15, y)
      y += 10
    })

    pdf.save(`${roadmap.targetRole}-roadmap.pdf`)
  } catch (err) {
    console.log(err)
  } finally {
    setDownloading(false)
  }
}

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-gray-400">Loading...</div>
  }

  if (!roadmap) {
    return <div className="flex items-center justify-center min-h-screen text-gray-400">No roadmap found. Generate one first!</div>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-1">Your Learning Roadmap</h2>
          <p className="text-gray-400">Target Role: <span className="text-indigo-400 font-semibold">{roadmap.targetRole}</span></p>
        </div>
        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold transition disabled:opacity-50 flex items-center gap-2"
        >
          {downloading ? 'Downloading...' : 'Download PDF'}
        </button>
      </div>

      <div id="roadmap-content">
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Job Readiness</span>
            <span className="text-indigo-400 font-bold">{roadmap.jobReadiness}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div
              className="bg-indigo-500 h-3 rounded-full"
              style={{ width: roadmap.jobReadiness + '%' }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {roadmap.weeks.map((week, index) => (
            <div
              key={index}
              className={`border rounded-xl p-6 ${week.completed ? 'border-green-500 bg-green-500/10' : 'border-gray-800 bg-gray-900'}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <span className="text-indigo-400 text-sm font-semibold">Week {week.week}</span>
                  <h3 className="text-xl font-bold mt-1">{week.topic}</h3>
                  <p className="text-gray-400 mt-2 text-sm">{week.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {week.resources.map((url, i) => (
                      
                        <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs bg-gray-800 text-indigo-400 px-3 py-1 rounded-full">
                        Resource {i + 1}
                      </a>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleComplete(index)}
                  disabled={week.completed}
                  className={`ml-4 px-4 py-2 rounded-lg text-sm font-semibold ${week.completed ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-indigo-500 hover:text-white'}`}
                >
                  {week.completed ? 'Done' : 'Mark Done'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Roadmap