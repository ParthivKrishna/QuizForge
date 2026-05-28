function ParticipantFields({
  fields,
  setFields
}) {

  function addField() {

    setFields([
      ...fields,

      {
        label: '',
        type: 'text',
        required: false,
        options: ''
      }
    ])
  }

  function updateField(index, key, value) {

    const updated = [...fields]

    updated[index][key] = value

    setFields(updated)
  }

  function removeField(index) {

    const updated =
      fields.filter((_, i) => i !== index)

    setFields(updated)
  }

  return (

    <div className="quiz-section">

      <div className="section-title-row">

        <h2>Participant Information</h2>

        <button
          className="btn btn-primary"
          onClick={addField}
        >
          + Add Field
        </button>

      </div>

      {

        fields.map((field, index) => (

          <div
            key={index}
            className="participant-field-card"
          >

            <div className="form-row">

              <div className="form-group">

                <label>Field Label</label>

                <input
                  className="input-field"
                  type="text"
                  placeholder="Name, Department..."
                  value={field.label}
                  onChange={(e) =>
                    updateField(
                      index,
                      'label',
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>Field Type</label>

                <select
                  className="input-field"
                  value={field.type}
                  onChange={(e) =>
                    updateField(
                      index,
                      'type',
                      e.target.value
                    )
                  }
                >
                  <option value="select" >
                    Select Dropdown
                  </option>

                  <option value="text" >
                    Text
                  </option>

                  <option value="number">
                    Number
                  </option>

                </select>

              </div>

            </div>
            {
                field.type === 'select' && (

                  <div className="form-group">

                    <label>
                      Dropdown Options
                    </label>

                    <textarea
                      className="input-field"
                      rows="4"
                      placeholder="Enter one option per line"

                      value={field.options}

                      onChange={(e) =>
                        updateField(
                          index,
                          'options',
                          e.target.value
                        )
                      }
                    />

                  </div>
                )
            }

            <div className="field-actions">

              <label className="checkbox-row">

                <input
                  type="checkbox"
                  
                  checked={field.required}
                  onChange={(e) =>
                    updateField(
                      index,
                      'required',
                      e.target.checked
                    )
                  }
                  
                />

                Required

              </label>

              <button
                className="btn btn-secondary"
                onClick={() => removeField(index)}
              >
                Remove
              </button>

            </div>

          </div>
        ))
      }

    </div>
  )
}

export default ParticipantFields