import {
  useEffect,
  useState
} from 'react'

import DashboardLayout from '../layouts/DashboardLayout'

import {
  getCurrentUser,
  getToken
} from '../utils/auth'

import {
  getBuilderQuizzes
} from '../services/builderQuizService'

import {
  getQuizResults
} from '../services/resultsService'

function BuilderResults() {

  const session =
    getCurrentUser()

  const token =
    getToken()

  const [quizzes, setQuizzes] =
    useState([])

  const [results, setResults] =
    useState({})

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    async function loadData() {

      try {

        const quizData =
          await getBuilderQuizzes(
            token
          )
          console.log(quizData)

        setQuizzes(
          quizData.quizzes
        )

        const resultMap = {}

        for (
          const quiz
          of quizData.quizzes
        ) {

          const resultData =
            await getQuizResults(
              quiz.roomId,
              token
            )
            console.log(resultData)

          resultMap[
            quiz.roomId
          ] = resultData

        }

        setResults(
          resultMap
        )

      } catch (err) {

        console.error(err)

      } finally {

        setLoading(false)

      }

    }

    loadData()

  }, [token])

  if (loading) {

    return (

      <DashboardLayout role="Builder">

        <div className="dashboard-page">

          <h2>
            Loading Results...
          </h2>

        </div>

      </DashboardLayout>

    )

  }

  return (

    <DashboardLayout role="Builder">

      <div className="dashboard-page">

        <div className="page-header">

          <h1>
            Results & Rankings
          </h1>

          <p>
            Review participant scores and submissions.
          </p>

        </div>

        {
          quizzes.length === 0 ? (

            <div className="quiz-section">

              <p className="empty-state">
                No quiz results available yet.
              </p>

            </div>

          ) : (

            quizzes.map((quiz) => {

              const ranking =
                results[
                  quiz.roomId
                ]?.results || []

              return (

                <div
                  className="quiz-section"
                  key={quiz.id}
                >

                  <div className="section-title-row">

                    <div>

                      <h2>
                        {quiz.title}
                      </h2>

                      <p>
                        Room ID: {quiz.roomId}
                      </p>

                    </div>

                  </div>

                  {
                    ranking.length === 0 ? (

                      <p className="empty-state">
                        No participant attempts yet.
                      </p>

                    ) : (

                      <div className="table-wrap">

                        <table className="results-table">

                          <thead>

                            <tr>

                              <th>
                                Rank
                              </th>

                              <th>
                                Participant
                              </th>

                              <th>
                                Score
                              </th>

                              <th>
                                Accuracy
                              </th>

                              <th>
                                Submitted
                              </th>

                            </tr>

                          </thead>

                          <tbody>

                            {
                              ranking.map(
                                (
                                  attempt,
                                  index
                                ) => {

                                  const accuracy =
                                    Math.round(
                                      (
                                        attempt.score /
                                        attempt.totalQuestions
                                      ) * 100
                                    )

                                  return (

                                    <tr
                                      key={attempt.id}
                                    >

                                      <td>
                                        {index + 1}
                                      </td>

                                      <td>
                                        {
                                          attempt.participantEmail
                                        }
                                      </td>

                                      <td>
                                        {
                                          attempt.score
                                        }
                                        /
                                        {
                                          attempt.totalQuestions
                                        }
                                      </td>

                                      <td>
                                        {
                                          accuracy
                                        }%
                                      </td>

                                      <td>
                                        {
                                          new Date(
                                            attempt.submittedAt
                                          ).toLocaleString()
                                        }
                                      </td>

                                    </tr>

                                  )

                                }
                              )
                            }

                          </tbody>

                        </table>

                      </div>

                    )
                  }

                </div>

              )

            })

          )
        }

      </div>

    </DashboardLayout>

  )

}

export default BuilderResults