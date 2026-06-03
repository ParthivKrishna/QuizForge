import { useNavigate } from 'react-router-dom'

import {
  getCurrentUser,
  logout
} from '../utils/auth'

function Navbar({ role }) {

  const navigate = useNavigate()

  const session =
    getCurrentUser()

  function handleLogout() {

    logout()

    navigate('/')

  }

  function goHome() {

    if (session?.role === 'builder') {
      navigate('/builder')
      return
    }

    if (session?.role === 'participant') {
      navigate('/participant')
      return
    }

    navigate('/')

  }

  return (

    <nav className="navbar">

      <div
        className="logo"
        onClick={() => navigate('/')}
      >
        Quiz<span>Forge</span>
      </div>

      <div className="nav-right">

        <button
          className="btn btn-secondary"
          onClick={goHome}
        >
          Home
        </button>

        <div className="role-badge">
          {session?.name || role}
        </div>

        <button
          className="btn btn-secondary"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>

  )

}

export default Navbar
