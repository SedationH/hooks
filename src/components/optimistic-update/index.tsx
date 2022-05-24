import React, { useEffect, useState } from "react"
import { useAsync, useAsyncRetry } from "react-use"
import noty from "@ppzp/noty" // 引入默认配置（动画、内容）的通知

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

const mockError = {
  canFetchTasks: false,
  canUpdateTask: true,
}

const fetchTasks = () =>
  new Promise<Task[]>((resolve, reject) => {
    setTimeout(() => {
      if (!mockError.canFetchTasks) {
        reject(new Error("fetchTasks 服务器异常"))
      }
      // 简单实现深拷贝
      resolve(JSON.parse(JSON.stringify(dbTasks)))
    }, 2000)
  })

const updateTask = (newTask: Task) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!mockError.canUpdateTask) {
        reject(new Error("updateTask 服务器异常"))
        return
      }
      const findInDbTask = dbTasks.find((dbTask) => dbTask.name === newTask.name)
      if (!findInDbTask) {
        return
      }
      findInDbTask.done = newTask.done
      resolve("done")
    }, 1000)
  })

function OptimisticUpdate() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)

  const doFetchTasks = () => {
    setLoading(true)
    return fetchTasks()
      .then(setTasks, (reason) => noty.error(reason))
      .finally(() => {
        setLoading(false)
      })
  }

  const doUpdateTask = (newTask: Task) => {
    setLoading(true)
    return updateTask(newTask)
      .catch((reason) => noty.error(reason))
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    doFetchTasks()
  }, [])

  const [mockErrorState, setMockErrorState] = useState(mockError)

  return (
    <div>
      <div>
        canFetchTasks:{" "}
        <input
          type="checkbox"
          checked={mockErrorState.canFetchTasks}
          onChange={() => {
            mockError.canFetchTasks = !mockError.canFetchTasks
            setMockErrorState({ ...mockError })
          }}
        />
      </div>

      <div>
        canUpdateTask:{" "}
        <input
          type="checkbox"
          checked={mockErrorState.canUpdateTask}
          onChange={() => {
            mockError.canUpdateTask = !mockError.canUpdateTask
            setMockErrorState({ ...mockError })
          }}
        />
      </div>
      <button onClick={doFetchTasks}>retry</button>
      <hr />
      <ul>
        {loading
          ? "loading"
          : tasks.map((task) => (
              <li key={task.name}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => {
                    doUpdateTask({
                      ...task,
                      done: !task.done,
                    }).then(doFetchTasks)
                  }}
                />{" "}
                {task.name}
              </li>
            ))}
      </ul>
    </div>
  )
}

export default OptimisticUpdate
