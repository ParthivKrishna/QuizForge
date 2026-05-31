const API_URL =
  'http://localhost:5000/api/quizzes'

async function parseResponse(response) {

  const contentType =
    response.headers.get('content-type') || ''

  if (
    contentType.includes('application/json')
  ) {

    return response.json()

  }

  return {
    success: false,
    message:
      await response.text() ||
      'Unexpected server response'
  }

}

export async function getQuizByRoomId(
  roomId
) {

  const response =
    await fetch(
      `${API_URL}/${roomId}`
    )

  const data =
    await parseResponse(response)

  if (!response.ok) {
    throw new Error(
      data.message
    )
  }

  return data

}

export async function submitQuiz(
  roomId,
  token,
  answers
) {

  const response =
    await fetch(
      `${API_URL}/${roomId}/submit`,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',

          Authorization:
            `Bearer ${token}`
        },

        body:
          JSON.stringify({
            answers
          })
      }
    )

  const data =
    await parseResponse(response)

  if (!response.ok) {
    throw new Error(
      data.message
    )
  }

  return data

}
