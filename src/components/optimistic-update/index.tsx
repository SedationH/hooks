import React, { useEffect, useState } from "react"
import { useAsync, useAsyncRetry } from "react-use"

interface Task {
  name: number
  done: boolean
}

const dbTasks: Task[] = [
  {
    name: 1,
    done: false,
  },
  {
    name: 2,
    done: true,
  },
  {
    name: 3,
    done: false,
  },
]

const fetchTasks = () =>
  new Promise<Task[]>((resolve, reject) => {
    setTimeout(() => {
      resolve(dbTasks)
      // reject(new Error("this is Error"))
    }, 2000)
  })

const updateTask = (newTask: Task) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const findInDbTask = dbTasks.find((dbTask) => dbTask.name === newTask.name)
      if (!findInDbTask) {
        return
      }
      findInDbTask.done = newTask.done
      resolve("done")
    }, 200)
  })

function OptimisticUpdate() {
  const { value: tasks, loading, error, retry } = useAsyncRetry(fetchTasks)

  return (
    <ul>
      {loading
        ? "loading"
        : error
        ? error.message
        : tasks?.map((task) => (
            <li key={task.name}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => {
                  updateTask({
                    ...task,
                    done: !task.done,
                  }).then(retry)
                }}
              />{" "}
              {task.name}
            </li>
          ))}
    </ul>
  )
}

export default OptimisticUpdate
