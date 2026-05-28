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

        const [option1, setOption1]
        = useState('')

        const [option2, setOption2]
        = useState('')

        const [option3, setOption3]
        = useState('')

        const [correctAnswer, setCorrectAnswer]
        = useState('')

        function parseCSV() {

            if (!csvData.trim()) return

            const lines =
            csvData.trim().split('\n')

            const parsedQuestions =
            lines.slice(1).map((line) => {

                const parts = line.split(',')

                    return {

                    question: parts[0],

                    options: [
                        parts[1],
                        parts[2],
                        parts[3]
                    ],

                    answer: parts[4]
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

             const newQuestion = {

                question: manualQuestion,

                options: [
                option1,
                option2,
                option3
                ],

                answer: correctAnswer
            }

            setQuestions([
                ...questions,
                newQuestion
            ])

            setManualQuestion('')
            setOption1('')
            setOption2('')
            setOption3('')
            setCorrectAnswer('')
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

                    <div className="form-row">

                        <div className="form-group">

                            <label>Option 1</label>

                            <input
                                type="text"
                                className="input-field"
                                value={option1}
                                onChange={(e) =>
                                setOption1(e.target.value)
                                }
                                />

                        </div>

                        <div className="form-group">

                            <label>Option 2</label>

                            <input
                                type="text"
                                className="input-field"
                                value={option2}
                                onChange={(e) =>
                                setOption2(e.target.value)
                                }
                            />

                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group">

                        <label>Option 3</label>

                            <input
                                type="text"
                                className="input-field"
                                value={option3}
                                onChange={(e) =>
                                setOption3(e.target.value)
                                }
                            />

                        </div>

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
                    placeholder={`Question,Option1,Option2,Option3,Answer
                                    Capital of India,Delhi,Mumbai,Chennai,Delhi`}

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