import {
  useEffect,
  useState
} from 'react'

import { useNavigate } from 'react-router-dom'

import DashboardCard from '../components/DashboardCard'
import DashboardLayout from '../layouts/DashboardLayout'

import {
  getCurrentUser,
  getToken
} from '../utils/auth'

import {
  getBuilderQuizzes
} from '../services/builderQuizService'

function BuilderDashboard() {

  const navigate = useNavigate()

  const user = getCurrentUser()
  const token = getToken()

  const [quizzes, setQuizzes] =
    useState([])

  const [loading, setLoading] =
    useState(true)

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

  if (!user) {
    return null
  }

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
            description={
              loading
                ? 'Loading published quizzes...'
                : `${quizzes.length} published quiz${quizzes.length === 1 ? '' : 'zes'}`
            }
            icon="H"
            accent="rgba(6,182,212,.2)"
            onClick={() =>
              navigate('/builder/history')
            }
          />

          <DashboardCard
            title="Results & Rankings"
            description="View participant fields, answers, and scores"
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
