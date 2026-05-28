import { useState } from 'react'

import DashboardLayout
from '../layouts/DashboardLayout'

import QuizSettings
from '../components/quiz/QuizSettings'

import ParticipantFields
from '../components/quiz/ParticipantFields'

import CSVImport
from '../components/quiz/CSVImport'
function CreateQuiz() {

    const [title, setTitle] = useState('')
    const [subject, setSubject] = useState('')
    const [description, setDescription] = useState('')
    const [timer, setTimer] = useState(30)
    const [fields, setFields] = useState([])
    //const [coverImage, setCoverImage]= useState(null)
    const [csvData, setCsvData] = useState('')
    const [questions, setQuestions] = useState([])

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
   // coverImage={coverImage}
   // setCoverImage={setCoverImage}
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

</div>
    </DashboardLayout>
  )
}

export default CreateQuiz