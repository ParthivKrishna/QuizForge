const express = require('express')

const {
  authenticate
} = require(
  './middleware/authMiddleware'
)

const authRoutes =
  require('./routes/authRoutes')

const app = express()

const quizRoutes =
  require('./routes/quizRoutes')

app.use(express.json())
app.use(
  '/api/quizzes',
  quizRoutes
)


app.get('/api/health', (req, res) => {

  res.json({
    status: 'ok',
    message: 'QuizForge backend is running'
  })

})

app.use('/api/auth', authRoutes)

app.listen(5000, () => {

  console.log(
    'Server running on port 5000'
  )

})

app.get(
  '/api/profile',
  authenticate,
  (req, res) => {

    res.json({
      success: true,
      user: req.user
    })

  }
)