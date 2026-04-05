import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
  question: String,
  userAnswer: String,
  feedback: String,
  score: Number
})

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetRole: String,
  questions: [questionSchema],
  overallScore: {
    type: Number,
    default: 0
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

export default mongoose.model('Interview', interviewSchema)