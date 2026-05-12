import { ref } from 'vue'
import posthog from 'posthog-js'

const STORAGE_KEY = 'unidone-tasks'

export function useTasks() {
  const tasks = ref(loadTasks())

  function loadTasks() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  }

  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value))
  }

  function addTask(task) {
    tasks.value.push({
      id: Date.now(),
      ...task,
      createdAt: new Date().toISOString()
    })
    saveTasks()
    posthog.capture('task_created', {
      subject: task.subject,
      type: task.type,
      deadline: task.deadline
    })
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
    saveTasks()
    posthog.capture('task_deleted', {
      task_id: String(id)
    })
  }

  function toggleDone(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.done = !task.done
      saveTasks()
      posthog.capture('task_completed', {
        task_id: String(id),
        done: task.done
      })
    }
  }

  return { tasks, addTask, removeTask, toggleDone }
}