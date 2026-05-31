const express = require('express')

const router = express.Router()

const {
  createQuiz,
  getQuizzes,
  getQuizByRoomId,
  submitQuiz,
  getMyAttempts,
  getQuizResults
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

router.get(
  '/',
  authenticate,
  requireBuilder,
  getQuizzes
)

router.post(
  '/:roomId/submit',
  authenticate,
  submitQuiz
)
router.get(
  '/my-attempts',
  authenticate,
  getMyAttempts
)
router.get(
  '/:roomId/results',
  authenticate,
  requireBuilder,
  getQuizResults
)
router.get(
  '/:roomId',

  getQuizByRoomId
)

module.exports = router