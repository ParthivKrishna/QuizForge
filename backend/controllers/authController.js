const users = []
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'quizforge-secret-key'

const bcrypt = require('bcrypt')

function validatePassword(password) {

  let score = 0

  const feedback = []

  if (password.length >= 8) {
    score += 20
  } else {
    feedback.push(
      'Password must be at least 8 characters long'
    )
  }

  if (/[A-Z]/.test(password)) {
    score += 20
  } else {
    feedback.push(
      'Add at least one uppercase letter'
    )
  }

  if (/[a-z]/.test(password)) {
    score += 20
  } else {
    feedback.push(
      'Add at least one lowercase letter'
    )
  }

  if (/[0-9]/.test(password)) {
    score += 20
  } else {
    feedback.push(
      'Add at least one number'
    )
  }

  if (
    /[!@#$%^&*(),.?":{}|<>]/.test(password)
  ) {
    score += 20
  } else {
    feedback.push(
      'Add at least one special character'
    )
  }

  return {
    valid: score === 100,
    score,
    feedback
  }

}
async function registerUser(req, res) {

  const {
    name,
    email,
    password,
    role
  } = req.body

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!name) {

    return res.status(400).json({
      success: false,
      message: 'Name is required'
    })

  }

  if (!email) {

    return res.status(400).json({
      success: false,
      message: 'Email is required'
    })

  }

  if (!emailRegex.test(email)) {

    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    })

  }

  if (!password) {

    return res.status(400).json({
      success: false,
      message: 'Password is required'
    })

  }

  const passwordCheck =
    validatePassword(password)

  if (!passwordCheck.valid) {

    return res.status(400).json({
      success: false,
      message: 'Weak password',
      score: passwordCheck.score,
      feedback: passwordCheck.feedback
    })

  }

  if (!role) {

    return res.status(400).json({
      success: false,
      message: 'Role is required'
    })

  }

  const existingUser =
    users.find(
      user =>
        user.email.toLowerCase() ===
        email.toLowerCase()
    )

  if (existingUser) {

    return res.status(400).json({
      success: false,
      message: 'User already exists'
    })

  }

  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    )

  users.push({
    name,
    email,
    password: hashedPassword,
    role
  })

  const token = jwt.sign(
    {
      email,
      role
    },
    JWT_SECRET,
    {
      expiresIn: '1d'
    }
  )

  const newUser = {
    name,
    email,
    role
  }

  res.json({
    success: true,
    message:
      'User registered successfully',
    token,
    user: newUser
  })

}
async function loginUser(req, res) {
  console.log('Login route hit')
  const bcrypt = require('bcrypt')
  console.log(req.body)

  const { email, password } = req.body
  if (!email || !password) {

    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    })

  }
  const user = users.find(
    user =>
      user.email.toLowerCase() ===
    email.toLowerCase()
  )
  
  
  if (!user) {

  return res.status(401).json({
    success: false,
    message: 'Invalid credentials'
  })

}
const isMatch =
  await bcrypt.compare(
    password,
    user.password
  )
if (!isMatch) {

  return res.status(401).json({
    success: false,
    message: 'Invalid credentials'
  })

}
const token = jwt.sign(
  {
    email: user.email,
    role: user.role
  },
  JWT_SECRET,
  {
    expiresIn: '1d'
  }
)
res.json({
  success: true,
  message: 'Login successful',
  token,
  user: {
    name: user.name,
    email: user.email,
    role: user.role
  }
})
}
module.exports = {
  registerUser,
  loginUser
}