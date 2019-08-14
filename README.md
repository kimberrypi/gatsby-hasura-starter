<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<h1 align="center">
  Gatsby-Hasura Starter Boilerplate
</h1>

This is a boilerplate for a Gatsby app paired with a Hasura project as the backend. 

The sample app is a simple to do list that demonstrates both query and mutation from the linked Hasura project. View the sample app at: [ghs.ksmorano.com](ghs.ksmorano.com)

## ⚙️ Setup

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the hello-world starter.

    ```sh
    # create a new Gatsby site using the gatsby-hasura starter
    gatsby new gatsby-hasura https://github.com/ksmorano/gatsby-hasura-starter
    ```

2.  **Setup Hasura endpoint**
    
    !! **The sample app won't work unless Hasura is configured properly.** To make the example run:
    1. Create a Hasura project. For more information, visit <a href="https://hasura.io">Hasura.io</a>. They have a **very easy** setup with Heroku.
    2. Add a todo table using the Hasura console:
    
    | column_name | column_type              |
    | ----------- | ------------------------ |
    | id          | Integer (auto increment) |
    | task        | Text                     |
    | priority    | Text                     |
      
3.  **Add your `env` variables**
    
    Create a `.env` file and add the following:

    ```env
    GATSBY_HASURA_GRAPHQL_URL=https://yourhasuraurl.com/v1/graphql
    GATSBY_HASURA_GRAPHQL_ADMIN_SECRET=youradminsecret
    ```

    `GATSBY_HASURA_GRAPHQL_URL` is the graphql endpoint that can be found in your Hasura console.
    `GATSBY_HASURA_GRAPHQL_ADMIN_SECRET` I set to your Hasura variables (as `HASURA_GRAPHQL_ADMIN_SECRET`) to protect your endpoint. This is set via the Heroku variables. For more information, visit [Hasura documentation](https://docs.hasura.io/1.0/graphql/manual/deployment/securing-graphql-endpoint.html).

4.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```sh
    cd gatsby-hasura/
    gatsby develop
    ```

5.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

## 📊 Making Queries and Mutations

1. Queries

   While `gatsby develop` is running, you may visit `http://localhost:8000/___graphql` to access the GraphiQL and test queries. 

   Example usage with `useQuery`:

   TodoList.js

   ```jsx
    import React from "react"
    import { useQuery } from "@apollo/react-hooks"
    import { gql } from "apollo-boost"

    const GET_TODOS = gql`
      {
        todo {
          id
          name
        }
      }
    `

    const TodoList = () => {
      const { loading, error, data } = useQuery(GET_TODOS)

      if (loading) return "loading..."
      if (error) return `Error: ${JSON.stringify(error)}`

      return (
        <div>
          {data.todo.map(item => (
            <p key={item.id}>{item.name}</p>
          ))}
        </div>
      )
    }

    export default TodoList
   ```
   
2. Mutations
   
   Example usage with `useMutation`:

   AddTodo.js
   ```jsx
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
      if (error) return `Error ${JSON.stringify(error, null, 2)}`

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
            <label htmlFor="task">
              Task
              <input
                name="task"
                type="text"
                value={values.task}
                onChange={event =>
                  setValue({ ...values, task: event.target.value })
                }
              />
            </label>

            <span>Priority:</span>
            <label htmlFor="priority">
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
            <label htmlFor="priority">
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

          <button type="submit">
            Add Todo
          </button>
        </form>
      )
    }

    export default TodoForm
   ``` 

## Dependencies
1. gatsby-source-graphql
2. @apollo/react-hooks
3. apollo-boost
4. apollo-link-http

---

This is my first contribution to open source, please feel free to DM me at Twitter ([@kimberrypi](twitter.com/kimberrypi)). Huge thanks to Jason Lengstorf and Vladimir Novick for the inspiration.

<!-- AUTO-GENERATED-CONTENT:END -->
