import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import DashboardLayout from '../layouts/DashboardLayout'
import { getAttemptsForUser, getQuizzes, getRankingForQuiz, getSession } from '../data/storage'

function ParticipantDashboard() {
  const navigate = useNavigate()
  const session = getSession()
  const attempts = getAttemptsForUser(session.id)
  const quizzes = getQuizzes()
  const [roomId, setRoomId] = useState('')
  const [error, setError] = useState('')

  function joinQuiz(event) {
    event.preventDefault()
    const quiz = quizzes.find(
      (item) => item.roomId.toLowerCase() === roomId.trim().toLowerCase()
    )

    if (!quiz) {
      setError('No quiz found with that room ID.')
      return
    }

    navigate(`/quiz/${quiz.roomId}`)
  }

  return (
    <DashboardLayout role="Participant">
      <div className="dashboard-page">
        <div className="page-header">
          <h1>Participant Dashboard</h1>
          <p>Join quizzes, review attempts, and track your rankings.</p>
        </div>

        <div className="quiz-section">
          <h2>Join Quiz</h2>
          <form className="join-form" onSubmit={joinQuiz}>
            <input
              className="input-field"
              placeholder="Enter room ID"
              value={roomId}
              onChange={(e) => {
                setError('')
                setRoomId(e.target.value)
              }}
              required
            />
            <button className="btn btn-primary" type="submit">
              Join
            </button>
          </form>
          {error && <div className="form-error">{error}</div>}
        </div>

        <div className="quiz-section">
          <h2>Quiz History</h2>
          {
            attempts.length === 0 ? (
              <p className="empty-state">You have not attempted any quizzes yet.</p>
            ) : (
              attempts.map((attempt) => {
                const quiz = quizzes.find((item) => item.id === attempt.quizId)
                const ranking = getRankingForQuiz(attempt.quizId)
                const rank =
                  ranking.findIndex((item) => item.id === attempt.id) + 1

                return (
                  <div className="question-card result-card" key={attempt.id}>
                    <div>
                      <h3>{quiz?.title || 'Deleted quiz'}</h3>
                      <p>{quiz?.subject || 'General'}</p>
                    </div>
                    <div className="score-pill">
                      {attempt.score}/{attempt.total}
                    </div>
                    <div className="meta-grid">
                      <span>Accuracy: {attempt.percentage}%</span>
                      <span>Rank: {rank || '-'}</span>
                      <span>
                        Submitted {new Date(attempt.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )
              })
            )
          }
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ParticipantDashboard
