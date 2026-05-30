import { useNavigate } from 'react-router-dom'

import QuizCard from '../components/QuizCard'
import DashboardLayout from '../layouts/DashboardLayout'
import { getBuilderQuizzes, getSession } from '../data/storage'

function BuilderHistory() {
  const navigate = useNavigate()
  const session = getSession()
  const quizzes = getBuilderQuizzes(session.id)

  return (
    <DashboardLayout role="Builder">
      <div className="dashboard-page">
        <div className="page-header">
          <h1>Quiz History</h1>
          <p>Manage room IDs, links, participant fields, and question counts.</p>
        </div>

        <div className="quiz-section">
          <div className="section-title-row">
            <h2>Created Quizzes</h2>
            <button className="btn btn-primary" onClick={() => navigate('/builder/create')}>
              New Quiz
            </button>
          </div>

          {
            quizzes.length === 0 ? (
              <p className="empty-state">No quizzes published yet.</p>
            ) : (
              quizzes.map((quiz) => (
                <QuizCard quiz={quiz} key={quiz.id}>
                  <div className="copy-link">
                    <input
                      className="input-field"
                      readOnly
                      value={`${window.location.origin}/quiz/${quiz.roomId}`}
                    />
                  </div>

                  <div className="meta-grid">
                    <span>{quiz.fields.length} participant fields</span>
                    <span>
                      Created {new Date(quiz.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </QuizCard>
              ))
            )
          }
        </div>
      </div>
    </DashboardLayout>
  )
}

export default BuilderHistory
