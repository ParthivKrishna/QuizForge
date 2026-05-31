import {
  useEffect,
  useState
} from 'react'

import {
  useNavigate
} from 'react-router-dom'

import QuizCard from '../components/QuizCard'
import DashboardLayout from '../layouts/DashboardLayout'

import {
  getCurrentUser
} from '../utils/auth'

import {
  getBuilderQuizzes
} from '../services/builderQuizService'

import {
  getToken
} from '../utils/auth'

function BuilderHistory() {

  const navigate = useNavigate()

  const session =
    getCurrentUser()
  const [quizzes, setQuizzes] =
  useState([])

  const [loading, setLoading] =
    useState(true)

  const token =
    getToken()
  useEffect(() => {

    async function loadQuizzes() {

      try {

        const data =
          await getBuilderQuizzes(
            token
          )

        setQuizzes(
          data.quizzes
        )

      } catch (err) {

        console.error(err)

      } finally {

        setLoading(false)

      }

    }

    loadQuizzes()

  }, [token])
  if (loading) {

    return (

      <DashboardLayout role="Builder">

        <div className="dashboard-page">

          <h2>
            Loading Quizzes...
          </h2>

        </div>

      </DashboardLayout>

    )

  }
  
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
