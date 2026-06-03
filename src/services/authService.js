const API_URL =
  'https://quizforge-backend-ghqe.onrender.com/api/auth'

export async function loginUser(
  email,
  password
) {

  const response =
    await fetch(
      `${API_URL}/login`,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json'
        },

        body: JSON.stringify({
          email,
          password
        })
      }
    )

  const data =
    await response.json()

  if (!response.ok) {
    throw new Error(
      data.message
    )
  }

  return data
}

export async function createUser(
  form
) {

  const response =
    await fetch(
      `${API_URL}/register`,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json'
        },

        body:
          JSON.stringify(form)
      }
    )

  const data =
    await response.json()

  if (!response.ok) {
    throw new Error(
      data.message
    )
  }

  return data
}