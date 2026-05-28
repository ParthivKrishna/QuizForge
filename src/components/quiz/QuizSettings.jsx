function QuizSettings({
  title,
  setTitle,
  subject,
  setSubject,
  description,
  setDescription,
  timer,
  setTimer,
  coverImage,
  setCoverImage
}) {

  return (

    <div className="quiz-section">

      <h2>Quiz Settings</h2>

      <div className="form-group">

        <label>Quiz Title</label>

        <input
        className="input-field"
          type="text"
          placeholder="Enter quiz title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

      </div>

      <div className="form-group">

        <label>Description</label>

        <textarea
        className="input-field"
          rows="4"
          placeholder="Quiz description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

      </div>

      <div className="form-row">

        <div className="form-group">

          <label>Subject</label>

          <input
          className="input-field"
            type="text"
            placeholder="Science, Math..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

        </div>

        <div className="form-group">

          <label>Timer Per Question</label>

          <input
          className="input-field"
            type="number"
            value={timer}
            onChange={(e) => setTimer(e.target.value)}
          />

        </div>

      </div>

    </div>
  )
}

export default QuizSettings