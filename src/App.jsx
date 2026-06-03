import { Routes, Route } from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import CreateQuiz from './pages/CreateQuiz'
import Login from './pages/Login'
import BuilderDashboard from './pages/BuilderDashboard'
import ParticipantDashboard from './pages/ParticipantDashboard'
import BuilderHistory from './pages/BuilderHistory'
import BuilderResults from './pages/BuilderResults'
import TakeQuiz from './pages/TakeQuiz'
import { useEffect } from 'react'

function App() {
  useEffect(() => {

    fetch(
      'https://quizforge-backend-ghqe.onrender.com/api/health'
    ).catch(() => {})

  }, [])

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/builder"
        element={
          <ProtectedRoute role="builder">
            <BuilderDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/builder/create"
        element={
          <ProtectedRoute role="builder">
            <CreateQuiz />
          </ProtectedRoute>
        }
      />
      <Route
        path="/builder/history"
        element={
          <ProtectedRoute role="builder">
            <BuilderHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/builder/results"
        element={
          <ProtectedRoute role="builder">
            <BuilderResults />
          </ProtectedRoute>
        }
      />
      <Route
        path="/participant"
        element={
          <ProtectedRoute role="participant">
            <ParticipantDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/quiz/:roomId"
        element={
          <ProtectedRoute role="participant">
            <TakeQuiz />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
