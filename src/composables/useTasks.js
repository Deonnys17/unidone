import { ref } from 'vue'

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
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
    saveTasks()
  }

  function toggleDone(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.done = !task.done
      saveTasks()
    }
  }

  return { tasks, addTask, removeTask, toggleDone }
}
