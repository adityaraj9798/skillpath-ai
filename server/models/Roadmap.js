import mongoose from 'mongoose'

const weekSchema = new mongoose.Schema({
  week: Number,
  topic: String,
  description: String,
  resources: [String],
  completed: {
    type: Boolean,
    default: false
  }
})

const roadmapSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetRole: {
    type: String,
    required: true
  },
  currentSkills: [String],
  weeks: [weekSchema],
  jobReadiness: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

export default mongoose.model('Roadmap', roadmapSchema)