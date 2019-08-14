import React from "react"
import TodoList from "../components/Todo/TodoList"
import TodoForm from "../components/Todo/TodoForm"

import "../styles.scss"

export default () => (
  <section className="content">
    <TodoForm />
    <hr />
    <TodoList />
  </section>
)
