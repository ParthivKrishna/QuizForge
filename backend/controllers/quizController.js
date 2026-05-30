const quizzes = []

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
module.exports = {
  createQuiz
}