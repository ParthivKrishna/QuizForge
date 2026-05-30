const USERS_KEY = 'quizforge_users'
const SESSION_KEY = 'quizforge_session'
const QUIZZES_KEY = 'quizforge_quizzes'
const ATTEMPTS_KEY = 'quizforge_attempts'

function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getUsers() {
  return read(USERS_KEY, [])
}

export function createUser(user) {
  const users = getUsers()
  const exists = users.some(
    (item) => item.email.toLowerCase() === user.email.toLowerCase()
  )

  if (exists) {
    throw new Error('An account already exists with this email.')
  }

  const newUser = {
    id: crypto.randomUUID(),
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role,
    createdAt: new Date().toISOString()
  }

  write(USERS_KEY, [...users, newUser])
  setSession(newUser)
  return newUser
}

export function loginUser(email, password) {
  const user = getUsers().find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase() &&
      item.password === password
  )

  if (!user) {
    throw new Error('Invalid email or password.')
  }

  setSession(user)
  return user
}

export function setSession(user) {
  write(SESSION_KEY, {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  })
}

export function getSession() {
  return read(SESSION_KEY, null)
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function getQuizzes() {
  return read(QUIZZES_KEY, [])
}

export function saveQuiz(quiz) {
  const quizzes = getQuizzes()
  const savedQuiz = {
    ...quiz,
    id: quiz.id || crypto.randomUUID(),
    roomId: quiz.roomId || makeRoomId(),
    createdAt: quiz.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  const nextQuizzes = quizzes.some((item) => item.id === savedQuiz.id)
    ? quizzes.map((item) => (item.id === savedQuiz.id ? savedQuiz : item))
    : [savedQuiz, ...quizzes]

  write(QUIZZES_KEY, nextQuizzes)
  return savedQuiz
}

export function getQuizByRoom(roomId) {
  return getQuizzes().find(
    (quiz) => quiz.roomId.toLowerCase() === roomId.toLowerCase()
  )
}

export function getBuilderQuizzes(builderId) {
  return getQuizzes().filter((quiz) => quiz.builderId === builderId)
}

export function getAttempts() {
  return read(ATTEMPTS_KEY, [])
}

export function saveAttempt(attempt) {
  const attempts = getAttempts()
  const savedAttempt = {
    ...attempt,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString()
  }

  write(ATTEMPTS_KEY, [savedAttempt, ...attempts])
  return savedAttempt
}

export function getAttemptsForQuiz(quizId) {
  return getAttempts().filter((attempt) => attempt.quizId === quizId)
}

export function getAttemptsForUser(userId) {
  return getAttempts().filter((attempt) => attempt.participantId === userId)
}

export function getRankingForQuiz(quizId) {
  return getAttemptsForQuiz(quizId)
    .slice()
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return new Date(a.submittedAt) - new Date(b.submittedAt)
    })
}

function makeRoomId() {
  return Math.random().toString(36).slice(2, 8).toUpperCase()
}
