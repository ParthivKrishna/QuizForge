import DashboardLayout from '../layouts/DashboardLayout'
import { getBuilderQuizzes, getRankingForQuiz, getSession } from '../data/storage'

function BuilderResults() {
  const session = getSession()
  const quizzes = getBuilderQuizzes(session.id)

  return (
    <DashboardLayout role="Builder">
      <div className="dashboard-page">
        <div className="page-header">
          <h1>Results & Rankings</h1>
          <p>Review participant information, scores, percentages, and ranks.</p>
        </div>

        {
          quizzes.length === 0 ? (
            <div className="quiz-section">
              <p className="empty-state">No quiz results available yet.</p>
            </div>
          ) : (
            quizzes.map((quiz) => {
              const ranking = getRankingForQuiz(quiz.id)

              return (
                <div className="quiz-section" key={quiz.id}>
                  <div className="section-title-row">
                    <div>
                      <h2>{quiz.title}</h2>
                      <p>Room ID: {quiz.roomId}</p>
                    </div>
                  </div>

                  {
                    ranking.length === 0 ? (
                      <p className="empty-state">No participant attempts yet.</p>
                    ) : (
                      <div className="table-wrap">
                        <table className="results-table">
                          <thead>
                            <tr>
                              <th>Rank</th>
                              <th>Participant</th>
                              <th>Score</th>
                              <th>Accuracy</th>
                              <th>Info</th>
                              <th>Submitted</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              ranking.map((attempt, index) => (
                                <tr key={attempt.id}>
                                  <td>{index + 1}</td>
                                  <td>{attempt.participantName}</td>
                                  <td>
                                    {attempt.score}/{attempt.total}
                                  </td>
                                  <td>{attempt.percentage}%</td>
                                  <td>
                                    {Object.entries(attempt.info)
                                      .map(([key, value]) => `${key}: ${value}`)
                                      .join(', ') || 'None'}
                                  </td>
                                  <td>
                                    {new Date(attempt.submittedAt).toLocaleString()}
                                  </td>
                                </tr>
                              ))
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
