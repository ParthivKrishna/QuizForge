import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { createUser, loginUser } from '../data/storage'

function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'builder'
  })
  const [error, setError] = useState('')

  function updateForm(key, value) {
    setError('')
    setForm({
      ...form,
      [key]: value
    })
  }

  function submitForm(event) {
    event.preventDefault()

    try {
      const user =
        mode === 'signup'
          ? createUser(form)
          : loginUser(form.email, form.password)

      navigate(`/${user.role}`)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>
          Quiz<span>Forge</span>
        </h1>

        <p>
          {mode === 'signup'
            ? 'Create your account for the first time'
            : 'Login with your saved credentials'}
        </p>

        <form className="login-form" onSubmit={submitForm}>
          {
            mode === 'signup' && (
              <input
                className="input-field"
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => updateForm('name', e.target.value)}
                required
              />
            )
          }

          <input
            className="input-field"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => updateForm('email', e.target.value)}
            required
          />

          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => updateForm('password', e.target.value)}
            required
          />

          {
            mode === 'signup' && (
              <select
                className="input-field"
                value={form.role}
                onChange={(e) => updateForm('role', e.target.value)}
              >
                <option value="builder">Quiz Builder</option>
                <option value="participant">Participant</option>
              </select>
            )
          }

          {error && <div className="form-error">{error}</div>}

          <button className="btn btn-primary" type="submit">
            {mode === 'signup' ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <button
          className="link-button"
          onClick={() => {
            setError('')
            setMode(mode === 'signup' ? 'login' : 'signup')
          }}
        >
          {mode === 'signup'
            ? 'Already have an account? Login'
            : 'First time here? Sign up'}
        </button>

      </div>
    </div>
  )
}

export default Login
