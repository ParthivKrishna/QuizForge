import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import DashboardLayout from '../layouts/DashboardLayout'
import { getQuizByRoom, getSession, saveAttempt } from '../data/storage'

function TakeQuiz() {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const session = getSession()
  const quiz = useMemo(() => getQuizByRoom(roomId), [roomId])
  const [info, setInfo] = useState({})
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  if (!quiz) {
    return (
      <DashboardLayout role="Participant">
        <div className="dashboard-page">
          <div className="quiz-section">
            <h2>Quiz Not Found</h2>
            <button className="btn btn-primary" onClick={() => navigate('/participant')}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  function updateInfo(label, value) {
    setInfo({
      ...info,
      [label]: value
    })
  }

  function submitQuiz(event) {
    event.preventDefault()

    const score = quiz.questions.reduce((total, question, index) => {
      return answers[index] === question.answer ? total + 1 : total
    }, 0)
    const percentage = Math.round((score / quiz.questions.length) * 100)
    const saved = saveAttempt({
      quizId: quiz.id,
      quizTitle: quiz.title,
      participantId: session.id,
      participantName: session.name,
      info,
      answers,
      score,
      total: quiz.questions.length,
      percentage
    })

    setResult(saved)
  }

  return (
    <DashboardLayout role="Participant">
      <div className="dashboard-page">
        <div className="page-header">
          <h1>{quiz.title}</h1>
          <p>{quiz.description || 'Answer each question and submit your attempt.'}</p>
        </div>

        {
          quiz.coverImage && (
            <img className="take-cover" src={quiz.coverImage} alt="" />
          )
        }

        {
          result ? (
            <div className="quiz-section result-summary">
              <h2>Your Result</h2>
              <div className="score-pill large">
                {result.score}/{result.total}
              </div>
              <p>Accuracy: {result.percentage}%</p>
              <button className="btn btn-primary" onClick={() => navigate('/participant')}>
                View History
              </button>
            </div>
          ) : (
            <form onSubmit={submitQuiz}>
              {
                quiz.fields.length > 0 && (
                  <div className="quiz-section">
                    <h2>Participant Information</h2>
                    {
                      quiz.fields.map((field) => (
                        <div className="form-group" key={field.label}>
                          <label>{field.label}</label>
                          {
                            field.type === 'select' ? (
                              <select
                                className="input-field"
                                required={field.required}
                                value={info[field.label] || ''}
                                onChange={(e) => updateInfo(field.label, e.target.value)}
                              >
                                <option value="">Select an option</option>
                                {
                                  field.options.split('\n').filter(Boolean).map((option) => (
                                    <option value={option} key={option}>
                                      {option}
                                    </option>
                                  ))
                                }
                              </select>
                            ) : (
                              <input
                                className="input-field"
                                type={field.type}
                                required={field.required}
                                value={info[field.label] || ''}
                                onChange={(e) => updateInfo(field.label, e.target.value)}
                              />
                            )
                          }
                        </div>
                      ))
                    }
                  </div>
                )
              }

              <div className="quiz-section">
                <h2>Questions</h2>
                {
                  quiz.questions.map((question, index) => (
                    <div className="question-card" key={`${question.question}-${index}`}>
                      <h4>
                        {index + 1}. {question.question}
                      </h4>
                      <div className="option-list">
                        {
                          question.options.map((option) => (
                            <label className="answer-option" key={option}>
                              <input
                                type="radio"
                                name={`question-${index}`}
                                value={option}
                                checked={answers[index] === option}
                                required
                                onChange={(e) =>
                                  setAnswers({
                                    ...answers,
                                    [index]: e.target.value
                                  })
                                }
                              />
                              {option}
                            </label>
                          ))
                        }
                      </div>
                    </div>
                  ))
                }
                <button className="btn btn-primary" type="submit">
                  Submit Quiz
                </button>
              </div>
            </form>
          )
        }
      </div>
    </DashboardLayout>
  )
}

export default TakeQuiz
