import React, { Fragment } from "react"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import classNames from "classnames"
import { container } from "./todo.module.scss"

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
    <Fragment>
      <h3 className="title is-5">My Todo:</h3>
      <div className={container}>
        {data.todo.map(task => (
          <p key={task.id}>
            {task.priority && (
              <span
                className={classNames("tag", {
                  "is-danger": task.priority === "high",
                  "is-success": task.priority === "low",
                })}
              >
                {task.priority}
              </span>
            )}
            {` ${task.task}`}
          </p>
        ))}
      </div>
    </Fragment>
  )
}

export default TodoList
