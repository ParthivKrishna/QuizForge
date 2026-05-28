import { useNavigate } from 'react-router-dom'
function Login() {
    const navigate = useNavigate()
  return (
    <div className="login-page">
      <div className="login-card">

        <h1>
          Quiz<span>Forge</span>
        </h1>

        <p>Select your role to continue</p>

        <div className="role-buttons">

          <button className="btn btn-primary " onClick={() => navigate('/builder')}>
            Quiz Builder
          </button>

          <button className="btn btn-secondary" onClick={() => navigate('/participant')}>
            Participant
          </button>

        </div>

      </div>
    </div>
  )
}

export default Login