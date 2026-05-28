import { Routes,Route } from 'react-router-dom'

import CreateQuiz from './pages/CreateQuiz'
import Login from './pages/Login'
import BuilderDashboard from './pages/BuilderDashboard'
import ParticipantDashboard from './pages/ParticipantDashboard'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/builder" element={<BuilderDashboard />} />
      <Route path="/participant" element={<ParticipantDashboard />} />
      <Route path="/builder/create" element={<CreateQuiz />}/>
    </Routes>
  )
}

export default App