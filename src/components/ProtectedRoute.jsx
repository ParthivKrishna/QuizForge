import { Navigate } from 'react-router-dom'

import { getSession } from '../data/storage'

function ProtectedRoute({ children, role }) {
  const session = getSession()

  if (!session) {
    return <Navigate to="/" replace />
  }

  if (role && session.role !== role) {
    return <Navigate to={`/${session.role}`} replace />
  }

  return children
}

export default ProtectedRoute
