import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import DashboardLayout
from '../layouts/DashboardLayout'

import QuizSettings
from '../components/quiz/QuizSettings'

import ParticipantFields
from '../components/quiz/ParticipantFields'

import CSVImport 
from '../components/quiz/CSVImport'
import {
  getToken
} from '../utils/auth'

import {
  createQuiz
} from '../services/quizService'
function CreateQuiz() {

    const navigate = useNavigate()
    const token = getToken()
    const [title, setTitle] = useState('')
    const [subject, setSubject] = useState('')
    const [description, setDescription] = useState('')
    const [timer, setTimer] = useState(30)
    const [fields, setFields] = useState([])
    const [coverImage, setCoverImage]= useState(null)
    const [csvData, setCsvData] = useState('')
    const [questions, setQuestions] = useState([])
    const [message, setMessage] = useState('')
    
    async function publishQuiz() {

      if (
        !title.trim() ||
        questions.length === 0
      ) {

        setMessage(
          'Add a title and at least one question before publishing.'
        )

        return

      }

      try {

        const result =
          await createQuiz(
            token,
            {
              title,
              subject,
              description,
              timer:
                Number(timer),

              fields,

              coverImage,

              questions
            }
          )

        setMessage(
          `Quiz published. Room ID: ${result.quiz.roomId}`
        )

      } catch (err) {

        setMessage(
          err.message
        )

      }

    }

  return (

    <DashboardLayout role="Builder">

     <div className="dashboard-page">

  <div className="page-header">

    <h1>Create Quiz</h1>

    <p>
      Configure quiz settings and participant information
    </p>

  </div>

  <QuizSettings
    title={title}
    setTitle={setTitle}
    subject={subject}
    setSubject={setSubject}
    description={description}
    setDescription={setDescription}
    timer={timer}
    setTimer={setTimer}
    coverImage={coverImage}
    setCoverImage={setCoverImage}
  />

  <ParticipantFields
    fields={fields}
    setFields={setFields}
  />
  <CSVImport
  csvData={csvData}
  setCsvData={setCsvData}
  questions={questions}
  setQuestions={setQuestions}
/>

  <div className="publish-bar">
    <div>
      <h2>Publish Quiz</h2>
      <p>Participants can join using the room ID or shared quiz link.</p>
      {message && <div className="form-success">{message}</div>}
    </div>

    <div className="publish-actions">
      <button className="btn btn-secondary" onClick={() => navigate('/builder')}>
        Back
      </button>
      <button className="btn btn-primary" onClick={publishQuiz}>
        Publish Quiz
      </button>
    </div>
  </div>

</div>
    </DashboardLayout>
  )
}

export default CreateQuiz
