import { useNavigate } from 'react-router-dom'

import DashboardLayout from '../layouts/DashboardLayout'
import DashboardCard from '../components/DashboardCard'
function BuilderDashboard() {
  const navigate = useNavigate();

  return (

    <DashboardLayout role="Builder">

      <div className="dashboard-page">

  <div className="dashboard-header">

    <div>

      <h1>Builder Dashboard</h1>

      <p>
        Create, deploy, and analyze quizzes
      </p>

    </div>

  </div>

  <div className="dashboard-grid">

    <DashboardCard
   title="Create Quiz"
   description="Build quizzes using CSV import or manual entry"
   icon="🛠"
   accent="rgba(124,58,237,.2)"
   onClick={() => navigate('/builder/create')}
/>

    <DashboardCard
      title="Quiz History"
      description="View, edit, and manage previously created quizzes"
      icon="🕘"
      accent="rgba(6,182,212,.2)"
    />

    <DashboardCard
      title="Analytics"
      description="Track participant performance and statistics"
      icon="📊"
      accent="rgba(245,158,11,.2)"
    />

    <DashboardCard
      title="Results & Rankings"
      description="View leaderboard and participant scores"
      icon="🏆"
      accent="rgba(16,185,129,.2)"
    />

  </div>

</div>

    </DashboardLayout>
  )
}

export default BuilderDashboard