import { useNavigate } from 'react-router-dom'

function Navbar({ role }) {

  const navigate = useNavigate()

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
          {role}
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate('/')}
        >
          Logout
        </button>

      </div>

    </nav>
  )
}

export default Navbar