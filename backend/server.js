const express = require('express')
require('dotenv').config()

const connectDB =
  require('./config/db')

console.log('connectDB =')
console.log(connectDB)
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

  console.error(err)

  if (res.headersSent) {
    return next(err)
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error'
  })

})

async function startServer() {

  console.log('Calling connectDB...')
  await connectDB()

  const PORT =
    process.env.PORT || 5000

  app.listen(PORT, () => {

    console.log(
      `Server running on port ${PORT}`
    )

  })

}

startServer()
