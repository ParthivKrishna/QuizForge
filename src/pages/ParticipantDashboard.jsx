import {
  useEffect,
  useState
} from 'react'

import {
  useNavigate
} from 'react-router-dom'

import DashboardLayout
from '../layouts/DashboardLayout'

import {
  getCurrentUser,
  getToken
} from '../utils/auth'

import {
  getQuizByRoomId
} from '../services/participantQuizService'

import {
  getMyAttempts
} from '../services/participantHistoryService'

function ParticipantDashboard() {

  const navigate =
    useNavigate()

  const session =
    getCurrentUser()

  const token =
    getToken()

  const [roomId, setRoomId] =
    useState('')

  const [error, setError] =
    useState('')

  const [attempts, setAttempts] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    async function loadAttempts() {
      const data =
  await getMyAttempts(
    token
  )

console.log('API Response:')
console.log(data)

setAttempts(
  data.attempts
)

console.log(
  'Attempts:',
  data.attempts
)

      try {

        const data =
          await getMyAttempts(
            token
          )

        setAttempts(
          data.attempts
        )

      } catch (err) {

        console.error(
          err
        )

      } finally {

        setLoading(false)

      }

    }

    loadAttempts()

  }, [token])

  async function joinQuiz(
    event
  ) {

    event.preventDefault()

    try {

      setError('')

      const data =
        await getQuizByRoomId(
          roomId.trim()
        )

      navigate(
        `/quiz/${data.quiz.roomId}`
      )

    } catch (err) {

      setError(
        err.message
      )

    }

  }

  if (loading) {

    return (

      <DashboardLayout role="Participant">

        <div className="dashboard-page">

          <h2>
            Loading History...
          </h2>

        </div>

      </DashboardLayout>

    )

  }

  return (

    <DashboardLayout role="Participant">

      <div className="dashboard-page">

        <div className="page-header">

          <h1>
            Participant Dashboard
          </h1>

          <p>
            Join quizzes and review your attempts.
          </p>

        </div>

        <div className="quiz-section">

          <h2>
            Join Quiz
          </h2>

          <form
            className="join-form"
            onSubmit={joinQuiz}
          >

            <input
              className="input-field"
              placeholder="Enter room ID"
              value={roomId}
              onChange={(e) => {

                setError('')

                setRoomId(
                  e.target.value
                )

              }}
              required
            />

            <button
              className="btn btn-primary"
              type="submit"
            >

              Join

            </button>

          </form>

          {
            error &&
            <div className="form-error">
              {error}
            </div>
          }

        </div>

        <div className="quiz-section">

          <h2>
            Quiz History
          </h2>

          {
            attempts.length === 0 ? (

              <p className="empty-state">

                You have not attempted any quizzes yet.

              </p>

            ) : (

              attempts.map(
                (attempt) => {

                  const accuracy =
                    Math.round(
                      (
                        attempt.score /
                        attempt.totalQuestions
                      ) * 100
                    )

                  return (

                    <div
                      className="question-card result-card"
                      key={attempt.id}
                    >

                      <div>

                        <h3>
                          Room ID:
                          {' '}
                          {attempt.roomId}
                        </h3>

                      </div>

                      <div className="score-pill">

                        {attempt.score}
                        /
                        {attempt.totalQuestions}

                      </div>

                      <div className="meta-grid">

                        <span>

                          Accuracy:
                          {' '}
                          {accuracy}%

                        </span>

                        <span>

                          Submitted
                          {' '}
                          {
                            new Date(
                              attempt.submittedAt
                            ).toLocaleDateString()
                          }

                        </span>

                      </div>

                    </div>

                  )

                }
              )

            )
          }

        </div>

      </div>

    </DashboardLayout>

  )

}

export default ParticipantDashboard