import React from "react"
import TodoList from "../components/Todo/TodoList"
import TodoForm from "../components/Todo/TodoForm"

import "../styles.scss"

export default () => (
  <section className="card card-content has-background-white">
    <TodoForm />
    <hr />
    <TodoList />
  </section>
)
