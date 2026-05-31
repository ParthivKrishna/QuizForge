const API_URL =
  'http://localhost:5000/api/quizzes'

export async function getMyAttempts(
  token
) {

  const response =
    await fetch(
      `${API_URL}/my-attempts`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
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