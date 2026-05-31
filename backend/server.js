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

const cors = require('cors')

app.use(cors())

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

app.use((err, req, res, next) => {

  void next

  console.error(err)

  res.status(500).json({
    success: false,
    message: 'Internal server error'
  })

})
