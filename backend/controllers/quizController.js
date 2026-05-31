const quizzes = []
const attempts = []

function createQuiz(req, res) {

  const {
    title,
    subject,
    description,
    timer,
    fields,
    questions,
    coverImage
  } = req.body

  if (!title) {

    return res.status(400).json({
      success: false,
      message: 'Title required'
    })

  }

  const quiz = {

    id: Date.now(),

    builderId: req.user.email,

    title,

    subject,

    description,

    timer,

    fields,

    questions,

    coverImage,

    roomId:
      Math.random()
      .toString(36)
      .slice(2, 8)
      .toUpperCase(),

    createdAt:
      new Date().toISOString()

  }

  quizzes.push(quiz)

  res.status(201).json({
    success: true,
    quiz
  })

}
function getQuizzes(req, res) {

  const builderQuizzes =
    quizzes.filter(
      quiz =>
        quiz.builderId === req.user.email
    )

  res.json({
    success: true,
    quizzes: builderQuizzes
  })

}
function getQuizByRoomId(req, res) {

  const { roomId } = req.params

  const quiz = quizzes.find(
    quiz =>
      quiz.roomId === roomId
  )

  if (!quiz) {

    return res.status(404).json({
      success: false,
      message: 'Quiz not found'
    })

  }

  res.json({
    success: true,
    quiz
  })

}
function submitQuiz(req, res) {
  const { roomId } = req.params

  const {
    answers
  } = req.body

  const quiz = quizzes.find(
    quiz => quiz.roomId === roomId
  )

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
    attempts.find(
      attempt =>
        attempt.roomId === roomId &&
        attempt.participantEmail === req.user.email
    )

  if (existingAttempt) {

    return res.status(400).json({
      success: false,
      message:
        'You have already submitted this quiz'
    })

  }

  let score = 0

  quiz.questions.forEach(
    (question, index) => {

      if (
        answers[index] ===
        question.answer
      ) {

        score++

      }

    }
  )

  const attempt = {

    id: Date.now(),

    roomId,

    participantEmail:
      req.user.email,

    answers,

    score,

    totalQuestions:
      quiz.questions.length,

    submittedAt:
      new Date().toISOString()

  }

  attempts.push(attempt)

  res.json({

    success: true,

    score,

    totalQuestions:
      quiz.questions.length

  })

}
function getQuizResults(req, res) {

  const { roomId } = req.params

  const quiz = quizzes.find(
    quiz => quiz.roomId === roomId
  )

  if (!quiz) {

    return res.status(404).json({
      success: false,
      message: 'Quiz not found'
    })

  }

  const results = attempts.filter(
    attempt => attempt.roomId === roomId
  )

  res.json({
    success: true,
    quiz: {
      title: quiz.title,
      roomId: quiz.roomId
    },
    totalAttempts: results.length,
    results
  })

}
function getMyAttempts(
  req,
  res
) {

  const userAttempts =
    attempts.filter(
      attempt =>
        attempt.participantEmail ===
        req.user.email
    )

  res.json({
    success: true,
    attempts: userAttempts
  })

}
module.exports = {
  createQuiz,
  getQuizzes,
  getQuizByRoomId,
  submitQuiz,
  getMyAttempts,
  getQuizResults
}
