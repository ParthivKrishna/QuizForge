const API_URL =
  'https://quizforge-backend-ghqe.onrender.com/api/quizzes'

export async function getBuilderQuizzes(
  token
) {

  const response =
    await fetch(
      API_URL,
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
      data.message || 'Could not load quizzes'
    )

  }

  return data

}
