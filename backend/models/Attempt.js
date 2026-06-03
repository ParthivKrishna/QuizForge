const mongoose =
  require('mongoose')

const attemptSchema =
  new mongoose.Schema({

    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    },

    roomId: {
      type: String,
      required: true
    },

    quizTitle: {
      type: String,
      required: true
    },

    participantEmail: {
      type: String,
      required: true
    },

    participantInfo: {
      type: Map,
      of: String,
      default: {}
    },

    answers: [
      {
        question: String,
        selectedAnswer: String,
        correctAnswer: String,
        isCorrect: Boolean
      }
    ],

    score: {
      type: Number,
      required: true
    },

    totalQuestions: {
      type: Number,
      required: true
    }

  },
  {
    timestamps: true
  })

attemptSchema.index(
  {
    roomId: 1,
    participantEmail: 1
  },
  {
    unique: true
  }
)

module.exports =
  mongoose.models.Attempt ||
  mongoose.model(
    'Attempt',
    attemptSchema
  )
