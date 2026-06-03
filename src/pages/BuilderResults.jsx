import {
  useEffect,
  useState
} from 'react'

import DashboardLayout from '../layouts/DashboardLayout'

import {
  getToken
} from '../utils/auth'

import {
  getBuilderQuizzes
} from '../services/builderQuizService'

import {
  getQuizResults
} from '../services/resultsService'

function BuilderResults() {

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

  function getInfoEntries(info) {

    if (!info || typeof info !== 'object') {
      return []
    }

    return Object.entries(info)
      .filter(([, value]) => value)

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
                  key={quiz._id || quiz.id}
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

                      <div className="attempt-list">

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

                              const infoEntries =
                                getInfoEntries(
                                  attempt.participantInfo
                                )

                              return (

                                <div
                                  className="attempt-card"
                                  key={attempt._id || attempt.id}
                                >

                                  <div className="attempt-header">

                                    <div>

                                      <h3>
                                        #{index + 1}
                                        {' '}
                                        {attempt.participantEmail}
                                      </h3>

                                      <p>
                                        Submitted
                                        {' '}
                                        {
                                          new Date(
                                            attempt.createdAt ||
                                            attempt.submittedAt
                                          ).toLocaleString()
                                        }
                                      </p>

                                    </div>

                                    <div className="score-pill">
                                      {attempt.score}
                                      /
                                      {attempt.totalQuestions}
                                      {' '}
                                      ({accuracy}%)
                                    </div>

                                  </div>

                                  <div className="result-detail-grid">

                                    <div>

                                      <h4>
                                        Participant Info
                                      </h4>

                                      {
                                        infoEntries.length === 0 ? (

                                          <p className="empty-state">
                                            No participant fields were submitted.
                                          </p>

                                        ) : (

                                          <div className="detail-list">

                                            {
                                              infoEntries.map(
                                                ([label, value]) => (

                                                  <div
                                                    className="detail-row"
                                                    key={label}
                                                  >
                                                    <span>
                                                      {label}
                                                    </span>
                                                    <strong>
                                                      {value}
                                                    </strong>
                                                  </div>

                                                )
                                              )
                                            }

                                          </div>

                                        )
                                      }

                                    </div>

                                    <div>

                                      <h4>
                                        Answers
                                      </h4>

                                      <div className="answer-review-list">

                                        {
                                          attempt.answers.map(
                                            (
                                              answer,
                                              answerIndex
                                            ) => (

                                              <div
                                                className={
                                                  answer.isCorrect
                                                    ? 'answer-review correct'
                                                    : 'answer-review incorrect'
                                                }
                                                key={`${answer.question}-${answerIndex}`}
                                              >

                                                <p>
                                                  {answerIndex + 1}.
                                                  {' '}
                                                  {answer.question}
                                                </p>

                                                <div>
                                                  <span>
                                                    Participant:
                                                    {' '}
                                                    {answer.selectedAnswer || 'No answer'}
                                                  </span>
                                                  <span>
                                                    Correct:
                                                    {' '}
                                                    {answer.correctAnswer}
                                                  </span>
                                                </div>

                                              </div>

                                            )
                                          )
                                        }

                                      </div>

                                    </div>

                                  </div>

                                </div>

                              )

                            }
                          )
                        }

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
