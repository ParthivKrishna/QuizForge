const express = require('express')

const router = express.Router()

const {
  createQuiz
} = require('../controllers/quizController')

const {
  authenticate
} = require('../middleware/authMiddleware')

const {
  requireBuilder
} = require('../middleware/roleMiddleware')

router.post(
  '/',
  authenticate,
  requireBuilder,
  createQuiz
)

module.exports = router