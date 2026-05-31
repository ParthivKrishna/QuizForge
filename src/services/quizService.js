const API_URL =
  'http://localhost:5000/api/quizzes'

export async function createQuiz(
  token,
  quizData
) {

  const response =
    await fetch(
      API_URL,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',

          Authorization:
            `Bearer ${token}`
        },

        body:
          JSON.stringify(
            quizData
          )
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