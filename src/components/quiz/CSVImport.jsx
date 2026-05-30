import { useState } from 'react'

function CSVImport({
  csvData,
  setCsvData,
  questions,
  setQuestions
}) {
        const [editingIndex, setEditingIndex]
        = useState(null)
        const [manualQuestion, setManualQuestion]
        = useState('')

        const [manualOptions, setManualOptions]
        = useState(['', '', '', ''])
        const [correctAnswer, setCorrectAnswer]
        = useState('')

        function parseCSV() {

            if (!csvData.trim()) return

            const lines =
            csvData.trim().split('\n')

            const parsedQuestions =
            lines.slice(1).map((line) => {

                const parts = line.split(',').map((part) => part.trim())

                    return {

                    question: parts[0],

                    options: parts.slice(1, -1),

                    answer: parts[parts.length - 1]
                    }
            })

            setQuestions(parsedQuestions)
        }
        function deleteQuestion(index) {

            const updatedQuestions =
                questions.filter((_, i) => i !== index)

            setQuestions(updatedQuestions)
        }
        function addManualQuestion() {
            const options =
                manualOptions.filter((option) => option.trim())

            if (!manualQuestion.trim() || options.length < 2 || !correctAnswer.trim()) {
                return
            }

             const newQuestion = {

                question: manualQuestion,

                options,

                answer: correctAnswer
            }

            setQuestions([
                ...questions,
                newQuestion
            ])

            setManualQuestion('')
            setManualOptions(['', '', '', ''])
            setCorrectAnswer('')
        }
        function updateManualOption(index, value) {
            const updatedOptions = [...manualOptions]
            updatedOptions[index] = value
            setManualOptions(updatedOptions)
        }
        function addManualOption() {
            setManualOptions([...manualOptions, ''])
        }
        function removeManualOption(index) {
            if (manualOptions.length <= 2) return
            setManualOptions(
                manualOptions.filter((_, optionIndex) => optionIndex !== index)
            )
        }
        function updateQuestion(
            index,
            key,
            value
            ) {

            const updatedQuestions =
                [...questions]

            updatedQuestions[index][key]
                = value

            setQuestions(updatedQuestions)
        }
        return (

            <div className="quiz-section">
                <div className="manual-question-builder">

                    <h3>Add Manual Question</h3>

                    <div className="form-group">

                        <label>Question</label>

                        <input
                        type="text"
                        className="input-field"
                        value={manualQuestion}
                        onChange={(e) =>
                        setManualQuestion(e.target.value)
                        }
                        />

                    </div>

                    <div className="section-title-row compact-row">

                        <h3>Options</h3>

                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={addManualOption}
                        >
                            + Add Option
                        </button>

                    </div>

                    {
                        manualOptions.map((option, index) => (
                            <div className="option-row" key={index}>
                                <div className="form-group">
                                    <label>Option {index + 1}</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={option}
                                        onChange={(e) =>
                                            updateManualOption(index, e.target.value)
                                        }
                                    />
                                </div>

                                <button
                                    className="btn btn-secondary option-remove"
                                    type="button"
                                    onClick={() => removeManualOption(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    }

                    <div className="form-row">
                        <div className="form-group">

                        <label>Correct Answer</label>

                            <input
                            type="text"
                            className="input-field"
                            value={correctAnswer}
                            onChange={(e) =>
                            setCorrectAnswer(e.target.value)
                            }
                            />

                        </div>

                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={addManualQuestion}
                    >
                        Add Question
                    </button>

                </div>

                <div className="section-title-row">

                    <h2>Question Import</h2>

                    <button
                    className="btn btn-primary"
                    onClick={parseCSV}
                    >
                    Parse Questions
                    </button>

                </div>

                <div className="form-group">

                    <label>Paste CSV Data</label>

                    <textarea
                    rows="10"
                    className="input-field"
                    placeholder={`Question,Option1,Option2,Option3,Option4,Answer
Capital of India,Delhi,Mumbai,Chennai,Kolkata,Delhi`}

                    value={csvData}

                    onChange={(e) =>
                    setCsvData(e.target.value)
                    }
                    />

                </div>

                {

                    questions.length > 0 && (

                        <div className="question-preview">

                            <h3>
                            Parsed Questions
                            </h3>

                            {

                            questions.map((q, index) => (

                            <div key={index} className="question-card">

                               {
                                    editingIndex === index ? (

                                        <input
                                        type="text"
                                        className="input-field"
                                        value={q.question}

                                        onChange={(e) =>
                                            updateQuestion(
                                            index,
                                            'question',
                                            e.target.value
                                            )
                                        }
                                        />

                                    ) : (

                                        <h4>
                                        {index + 1}.
                                        {' '}
                                        {q.question}
                                        </h4>
                                    )
                                }

                                <ul>

                                    {
                                    q.options.map(
                                        (option, i) => (

                                        <li key={i}>
                                            {
                                                editingIndex === index ? (

                                                <input
                                                    type="text"
                                                    className="input-field"
                                                    value={option}

                                                    onChange={(e) => {

                                                    const updatedQuestions =
                                                        [...questions]

                                                    updatedQuestions[index]
                                                        .options[i]
                                                        = e.target.value

                                                    setQuestions(updatedQuestions)
                                                    }}
                                                />

                                                ) : (

                                                option
                                                )
                                            }

                                        </li>
                                        )
                                    )
                                    }

                                </ul>

                                <div className="correct-answer">
                                    {
                                        editingIndex === index ? (

                                        <input
                                            type="text"
                                            className="input-field"
                                            value={q.answer}

                                            onChange={(e) =>
                                            updateQuestion(
                                                index,
                                                'answer',
                                                e.target.value
                                            )
                                            }
                                        />

                                        ) : (

                                        <>
                                            Correct Answer:
                                            {' '}
                                            {q.answer}
                                        </>
                                        )
                                    }

                                </div>
                                <button
                                    className="btn btn-secondary delete-btn"
                                    onClick={() => deleteQuestion(index)}>
                                    Delete Question
                                </button>
                                <button
                                    className="btn btn-primary"

                                    onClick={() =>

                                        setEditingIndex(

                                        editingIndex === index
                                            ? null
                                            : index
                                        )
                                    }
                                    >

                                    {
                                        editingIndex === index
                                        ? 'Save'
                                        : 'Edit'
                                    }

                                </button>
                            </div>
                            ))
                            }

                        </div>
                    )
                }

            </div>
        )
    }

export default CSVImport
