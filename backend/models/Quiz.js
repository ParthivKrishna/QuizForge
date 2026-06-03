const mongoose =
  require('mongoose')

const participantFieldSchema =
  new mongoose.Schema({

    label: String,

    type: {
      type: String,
      default: 'text'
    },

    required: {
      type: Boolean,
      default: false
    },

    options: {
      type: String,
      default: ''
    }

  },
  {
    _id: false
  })

const questionSchema =
  new mongoose.Schema({

    question: String,

    options: [String],

    answer: String

  },
  {
    _id: false
  })

const quizSchema =
  new mongoose.Schema({

    builderId: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    subject: String,

    description: String,

    timer: Number,

    fields: [participantFieldSchema],

    questions: [questionSchema],

    coverImage: String,

    roomId: {
      type: String,
      unique: true
    }

  },
  {
    timestamps: true
  })

module.exports =
  mongoose.models.Quiz ||
  mongoose.model(
    'Quiz',
    quizSchema
  )
