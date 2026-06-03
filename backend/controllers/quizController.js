const Quiz = require('../models/Quiz')
const Attempt = require('../models/Attempt')

function makeRoomId() {

  return Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()

}

function normalizeFields(fields = []) {

  if (typeof fields === 'string') {

    try {
      fields = JSON.parse(fields)
    } catch {
      return []
    }

  }

  if (!Array.isArray(fields)) {
    return []
  }

  return fields
    .filter(field => field && field.label)
    .map(field => ({
      label: String(field.label).trim(),
      type: field.type || 'text',
      required: Boolean(field.required),
      options: field.options || ''
    }))

}

function normalizeQuestions(questions = []) {

  if (!Array.isArray(questions)) {
    return []
  }

  return questions
    .filter(question => question && question.question)
    .map(question => ({
      question: String(question.question).trim(),
      options: Array.isArray(question.options)
        ? question.options
          .map(option => String(option).trim())
          .filter(Boolean)
        : [],
      answer: question.answer
        ? String(question.answer).trim()
        : ''
    }))

}

async function createQuiz(req, res) {

  const {
    title,
    subject,
    description,
    timer,
    fields,
    questions,
    coverImage
  } = req.body

  const normalizedQuestions =
    normalizeQuestions(questions)

  if (!title || !title.trim()) {

    return res.status(400).json({
      success: false,
      message: 'Title required'
    })

  }

  if (normalizedQuestions.length === 0) {

    return res.status(400).json({
      success: false,
      message: 'At least one question is required'
    })

  }

  try {

    let quiz

    for (let attempt = 0; attempt < 5; attempt++) {

      try {

        quiz = await Quiz.create({
          builderId: req.user.email,
          title: title.trim(),
          subject,
          description,
          timer,
          fields: normalizeFields(fields),
          questions: normalizedQuestions,
          coverImage: typeof coverImage === 'string'
            ? coverImage
            : '',
          roomId: makeRoomId()
        })

        break

      } catch (error) {

        if (
          error.code === 11000 &&
          error.keyPattern?.roomId &&
          attempt < 4
        ) {
          continue
        }

        throw error

      }

    }

    return res.status(201).json({
      success: true,
      quiz
    })

  } catch (error) {

    console.error('CREATE QUIZ ERROR:', error)

    return res.status(500).json({
      success: false,
      message: error.message || 'Could not create quiz'
    })

  }

}
async function getQuizzes(req, res) {

  try {

    console.log(
      'Fetching quizzes for:',
      req.user.email
    )

    const builderQuizzes =
      await Quiz.find({
        builderId:
          req.user.email
      })

    console.log(
      'Found quizzes:',
      builderQuizzes.length
    )

    return res.json({
      success: true,
      quizzes: builderQuizzes
    })

  } catch (error) {

    console.error(
      'GET QUIZZES ERROR:',
      error
    )

    return res.status(500).json({
      success: false,
      message: error.message
    })

  }

}

async function getQuizByRoomId(req, res) {

  try {

    const { roomId } = req.params

    console.log('Looking for room:', roomId)

    const quiz =
      await Quiz.findOne({
        roomId
      })

    console.log('Quiz found:', quiz)

    if (!quiz) {

      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      })

    }
    const safeQuiz = {

      ...quiz.toObject(),

      questions:
        quiz.questions.map(
          q => ({

            question:
              q.question,

            options:
              q.options

          })
        )

    }

    return res.json({
      success: true,
      quiz: safeQuiz
    })


  } catch (error) {

    console.error(error)

    return res.status(500).json({
      success: false,
      message: error.message
    })

  }

}
async function submitQuiz(req, res) {

  const { roomId } = req.params

  const {
    answers,
    participantInfo
  } = req.body

  try {

    const quiz =
      await Quiz.findOne({
        roomId
      })

    if (!quiz) {

      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      })

    }

    if (!answers || typeof answers !== 'object') {

      return res.status(400).json({
        success: false,
        message: 'Answers are required'
      })

    }

    const existingAttempt =
      await Attempt.findOne({
        roomId,
        participantEmail:
          req.user.email
      })

    if (existingAttempt) {

      return res.status(400).json({
        success: false,
        message:
          'You have already submitted this quiz'
      })

    }

    let score = 0

    const detailedAnswers =
      quiz.questions.map(
        (question, index) => {

          const selectedAnswer =
            answers[index] || ''

          const isCorrect =
            selectedAnswer ===
            question.answer

          if (isCorrect) {
            score++
          }

          return {
            question:
              question.question,
            selectedAnswer,
            correctAnswer:
              question.answer,
            isCorrect
          }

        }
      )

    const cleanedInfo = {}

    if (
      participantInfo &&
      typeof participantInfo === 'object' &&
      !Array.isArray(participantInfo)
    ) {

      Object.entries(participantInfo).forEach(
        ([key, value]) => {

          cleanedInfo[key] =
            value === undefined ||
            value === null
              ? ''
              : String(value)

        }
      )

    }

    const attempt =
      await Attempt.create({
        quizId: quiz._id,
        roomId,
        quizTitle: quiz.title,
        participantEmail:
          req.user.email,
        participantInfo:
          cleanedInfo,
        answers:
          detailedAnswers,
        score,
        totalQuestions:
          quiz.questions.length
      })

    return res.json({

      success: true,

      score,

      totalQuestions:
        quiz.questions.length,

      attempt

    })

  } catch (error) {

    console.error('SUBMIT QUIZ ERROR:', error)

    return res.status(500).json({
      success: false,
      message: error.message || 'Could not submit quiz'
    })

  }

}
async function getQuizResults(req, res) {

  const { roomId } = req.params

  try {

    const quiz =
      await Quiz.findOne({
        roomId
      })

    if (!quiz) {

      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      })

    }

    if (
      quiz.builderId !==
      req.user.email
    ) {

      return res.status(403).json({
        success: false,
        message: 'You can only view results for your own quizzes'
      })

    }

    const results =
      await Attempt.find({
        roomId
      }).sort({
        score: -1,
        createdAt: 1
      })

    return res.json({
      success: true,
      quiz: {
        title: quiz.title,
        roomId: quiz.roomId,
        fields: quiz.fields,
        questions: quiz.questions
      },
      totalAttempts: results.length,
      results
    })

  } catch (error) {

    console.error('GET QUIZ RESULTS ERROR:', error)

    return res.status(500).json({
      success: false,
      message: error.message || 'Could not load quiz results'
    })

  }

}
async function getMyAttempts(
  req,
  res
) {

  try {

    const userAttempts =
      await Attempt.find({
        participantEmail:
          req.user.email
      }).sort({
        createdAt: -1
      })

    return res.json({
      success: true,
      attempts: userAttempts
    })

  } catch (error) {

    console.error('GET MY ATTEMPTS ERROR:', error)

    return res.status(500).json({
      success: false,
      message: error.message || 'Could not load attempts'
    })

  }

}
module.exports = {
  createQuiz,
  getQuizzes,
  getQuizByRoomId,
  submitQuiz,
  getMyAttempts,
  getQuizResults
}
