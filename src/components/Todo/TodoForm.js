import React, { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

const ADD_TODO = gql`
  mutation insert_todo($task: String!, $priority: String!, $done: Boolean!) {
    insert_todo(objects: { task: $task, priority: $priority, done: $done }) {
      returning {
        task
        priority
      }
    }
  }
`

const TodoForm = () => {
  const [values, setValue] = useState({ task: "", priority: "", done: false })
  const [insert_todo, { loading, error }] = useMutation(ADD_TODO, {
    onCompleted: () => setValue({ task: "", priority: "", done: false }),
  })

  if (loading) return "loading..."
  if (error)
    return (
      <p>
        Please make sure that your Hasura project is properly setup.
        <span className="help">Error details: ${JSON.stringify(error)}</span>
      </p>
    )

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        insert_todo({
          variables: {
            task: values.task,
            priority: values.priority,
            done: false,
          },
        })
      }}
    >
      <div className="field control">
        <label htmlFor="task" className="has-text-weight-bold">
          Task
          <input
            name="task"
            type="text"
            className="input"
            value={values.task}
            onChange={event =>
              setValue({ ...values, task: event.target.value })
            }
          />
        </label>
      </div>

      <div className="field control">
        <span className="pr-1 has-text-weight-bold">Priority:</span>
        <label htmlFor="priority" className="radio">
          <input
            name="priority"
            className="radio"
            type="radio"
            value="high"
            onChange={event =>
              setValue({ ...values, priority: event.target.value })
            }
          />
          High
        </label>
        <label htmlFor="priority" className="radio">
          <input
            name="priority"
            className="radio"
            type="radio"
            value="low"
            onChange={event =>
              setValue({ ...values, priority: event.target.value })
            }
          />
          Low
        </label>
      </div>

      <button type="submit" className="button is-info">
        Add Todo
      </button>
    </form>
  )
}

export default TodoForm
