const API_URL =
  'http://localhost:5000/api/quizzes'

export async function getQuizResults(
  roomId,
  token
) {

  const response =
    await fetch(
      `${API_URL}/${roomId}/results`,
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
      data.message || 'Could not load quiz results'
    )
  }

  return data

}
