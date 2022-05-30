import React, { useEffect, useRef, useState } from "react"
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
  canFetchTasks: true,
  canUpdateTask: true,
}

const deepClone = <T,>(obj: T): T => JSON.parse(JSON.stringify(obj))

const fetchTasks = () =>
  new Promise<Task[]>((resolve, reject) => {
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
  const [useOptimisticUpdate, setUseOptimisticUpdate] = useState(false)

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

  const prevTasks = useRef(tasks)

  const doOptimisticUpdate = (newTask: Task) => {
    // 保存上一次的状态，用于失败的时候进行重置
    prevTasks.current = tasks
    const temp = deepClone(tasks)
    const idx = temp.findIndex((task) => task.name === newTask.name)
    if (idx === -1) {
      return
    }
    temp[idx] = newTask
    // 假设成功 修改State
    setTasks(temp)

    // 请求服务器进行更新
    return updateTask(newTask).catch((reason) => {
      // 如果失败 进行状态重置
      noty.error(reason)
      setTasks(prevTasks.current)
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

      <div>
        useOptimisticUpdate:{" "}
        <input
          type="checkbox"
          checked={useOptimisticUpdate}
          onChange={() => {
            setUseOptimisticUpdate(!useOptimisticUpdate)
          }}
        />
      </div>
      <button onClick={doFetchTasks}>FetchTasks</button>
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
                    if (useOptimisticUpdate) {
                      doOptimisticUpdate({
                        ...task,
                        done: !task.done,
                      })
                      return
                    }
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
