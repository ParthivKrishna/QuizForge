import { useNavigate } from 'react-router-dom'

import { clearSession, getSession } from '../data/storage'

function Navbar({ role }) {

  const navigate = useNavigate()
  const session = getSession()

  function logout() {
    clearSession()
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

        <div className="role-badge">
          {session?.name || role}
        </div>

        <button
          className="btn btn-secondary"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>
  )
}

export default Navbar
