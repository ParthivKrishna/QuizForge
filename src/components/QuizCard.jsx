function QuizCard({ quiz, children }) {
  return (
    <div className="question-card quiz-list-card">
      {
        quiz.coverImage && (
          <img className="quiz-card-cover" src={quiz.coverImage} alt="" />
        )
      }

      <div>
        <h3>{quiz.title}</h3>
        <p>{quiz.description || 'No description added.'}</p>
      </div>

      <div className="meta-grid">
        <span>Room: {quiz.roomId}</span>
        <span>{quiz.questions.length} questions</span>
        <span>{quiz.timer}s per question</span>
        <span>{quiz.subject || 'General'}</span>
      </div>

      {children}
    </div>
  )
}

export default QuizCard
