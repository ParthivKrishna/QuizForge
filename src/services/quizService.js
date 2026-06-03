const API_URL =
  'https://quizforge-backend-ghqe.onrender.com/api/quizzes'
  console.log('QUIZ SERVICE LOADED')
console.log(API_URL)

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
      data.message || 'Could not publish quiz'
    )
  }

  return data
}
