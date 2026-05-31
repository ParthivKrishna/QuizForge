import { useNavigate } from 'react-router-dom'

import DashboardCard from '../components/DashboardCard'
import DashboardLayout from '../layouts/DashboardLayout'

import {
  getAttemptsForQuiz,
  getBuilderQuizzes
} from '../data/storage'

import {
  getCurrentUser
} from '../utils/auth'

function BuilderDashboard() {

  const navigate = useNavigate()

  const user = getCurrentUser()

  if (!user) {
    return null
  }

  const quizzes =
    getBuilderQuizzes(user.email)

  const attempts =
    quizzes.flatMap(
      quiz =>
        getAttemptsForQuiz(
          quiz.id
        )
    )

  return (

    <DashboardLayout role="Builder">

      <div className="dashboard-page">

        <div className="dashboard-header">

          <div>

            <h1>
              Builder Dashboard
            </h1>

            <p>
              Create, deploy, and analyze quizzes
            </p>

          </div>

        </div>

        <div className="dashboard-grid">

          <DashboardCard
            title="Create Quiz"
            description="Build quizzes using CSV import or manual entry"
            icon="+"
            accent="rgba(124,58,237,.2)"
            onClick={() =>
              navigate('/builder/create')
            }
          />

          <DashboardCard
            title="Quiz History"
            description={`${quizzes.length} published quiz${quizzes.length === 1 ? '' : 'zes'}`}
            icon="H"
            accent="rgba(6,182,212,.2)"
            onClick={() =>
              navigate('/builder/history')
            }
          />

          <DashboardCard
            title="Results & Rankings"
            description="View leaderboard and participant scores"
            icon="#"
            accent="rgba(16,185,129,.2)"
            onClick={() =>
              navigate('/builder/results')
            }
          />

        </div>

      </div>

    </DashboardLayout>

  )

}

export default BuilderDashboard