import { useNavigate } from 'react-router-dom'

import DashboardCard from '../components/DashboardCard'
import DashboardLayout from '../layouts/DashboardLayout'
import { getAttemptsForQuiz, getBuilderQuizzes, getSession } from '../data/storage'

function BuilderDashboard() {
  const navigate = useNavigate()
  const session = getSession()
  const quizzes = getBuilderQuizzes(session.id)
  const attempts = quizzes.flatMap((quiz) => getAttemptsForQuiz(quiz.id))

  return (
    <DashboardLayout role="Builder">
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div>
            <h1>Builder Dashboard</h1>
            <p>Create, deploy, and analyze quizzes</p>
          </div>
        </div>

        <div className="dashboard-grid">
          <DashboardCard
            title="Create Quiz"
            description="Build quizzes using CSV import or manual entry"
            icon="+"
            accent="rgba(124,58,237,.2)"
            onClick={() => navigate('/builder/create')}
          />

          <DashboardCard
            title="Quiz History"
            description={`${quizzes.length} published quiz${quizzes.length === 1 ? '' : 'zes'}`}
            icon="H"
            accent="rgba(6,182,212,.2)"
            onClick={() => navigate('/builder/history')}
          />

          <DashboardCard
            title="Analytics"
            description={`${attempts.length} participant attempt${attempts.length === 1 ? '' : 's'}`}
            icon="A"
            accent="rgba(245,158,11,.2)"
            onClick={() => navigate('/builder/results')}
          />

          <DashboardCard
            title="Results & Rankings"
            description="View leaderboard and participant scores"
            icon="#"
            accent="rgba(16,185,129,.2)"
            onClick={() => navigate('/builder/results')}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default BuilderDashboard
