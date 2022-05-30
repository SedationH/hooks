import React, { useEffect, useRef, useState } from "react"
import noty from "@ppzp/noty" // 引入默认配置（动画、内容）的通知
import useSWR, { useSWRConfig } from "swr"

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
  canFetchTasks: true,
  canUpdateTask: true,
}

const deepClone = <T,>(obj: T): T => JSON.parse(JSON.stringify(obj))

const fetchTasks = () =>
  new Promise<Task[]>((resolve, reject) => {
    console.log("sedationh Server get request\n", "fetchTasks")
    setTimeout(() => {
      if (!mockError.canFetchTasks) {
        reject(new Error("fetchTasks 服务器异常"))
      }
      // 简单实现深拷贝
      resolve(deepClone(dbTasks))
    }, 2000)
  })

const updateTask = (newTask: Task) =>
  new Promise((resolve, reject) => {
    console.log("sedationh Server get request\n", "updateTask")
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

function SWR() {
  const [mockErrorState, setMockErrorState] = useState(mockError)
  const { data: tasks, error } = useSWR("fetchTasks", fetchTasks)
  const loading = !tasks && !error
  const { mutate } = useSWRConfig()

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

      {/* <button onClick={doFetchTasks}>FetchTasks</button> */}
      <hr />
      <ul>
        {loading
          ? "loading"
          : tasks?.map((task) => (
              <li key={task.name}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => {
                    const newTask = {
                      ...task,
                      done: !task.done,
                    }
                    const temp = deepClone(tasks)
                    const idx = temp.findIndex((task) => task.name === newTask.name)
                    if (idx === -1) {
                      return
                    }
                    temp[idx] = newTask
                    mutate(
                      "fetchTasks",
                      async () => {
                        await updateTask(newTask).catch((reason) => {
                          noty.error(reason)
                          return Promise.reject(reason)
                        })
                        return temp
                      },
                      {
                        rollbackOnError: true,
                        optimisticData: temp,
                      }
                    ).catch()
                  }}
                />{" "}
                {task.name}
              </li>
            ))}
      </ul>
    </div>
  )
}

export default SWR
