import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import classNames from "classnames"

const GET_TODOS = gql`
  {
    todo(order_by: { priority: asc }) {
      id
      task
      priority
      done
    }
  }
`

const TodoList = () => {
  const { loading, error, data } = useQuery(GET_TODOS)

  if (loading) return "loading..."
  if (error)
    return (
      <p>
        Please make sure that your Hasura project is properly setup.
        <span className="help">Error details: ${JSON.stringify(error)}</span>
      </p>
    )

  return (
    <div>
      <h3 className="title is-5">My Todo:</h3>
      {data.todo.map(task => (
        <p key={task.id}>
          <span
            className={classNames("tag", {
              "is-danger": task.priority === "high",
              "is-success": task.priority === "low",
            })}
          >
            {task.priority}
          </span>
          {` ${task.task}`}
        </p>
      ))}
    </div>
  )
}

export default TodoList
