import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTasks } from '../useTasks'

// Мок для localStorage
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: vi.fn(key => store[key] ?? null),
    setItem: vi.fn((key, value) => { store[key] = value }),
    clear: vi.fn(() => { store = {} })
  }
})()

vi.stubGlobal('localStorage', localStorageMock)

beforeEach(() => {
  localStorageMock.clear()
  vi.clearAllMocks()
})

describe('useTasks', () => {

  it('повертає порожній список якщо localStorage порожній', () => {
    const { tasks } = useTasks()
    expect(tasks.value).toEqual([])
  })

  it('addTask — додає завдання до списку', () => {
    const { tasks, addTask } = useTasks()
    addTask({ title: 'Здати лабу', subject: 'IT', deadline: '2026-05-20', priority: 'high' })
    expect(tasks.value).toHaveLength(1)
    expect(tasks.value[0].title).toBe('Здати лабу')
  })

  it('addTask — зберігає завдання в localStorage', () => {
    const { addTask } = useTasks()
    addTask({ title: 'Тест', subject: 'Math', deadline: '2026-05-20', priority: 'low' })
    expect(localStorageMock.setItem).toHaveBeenCalled()
  })

  it('addTask — автоматично додає id та createdAt', () => {
    const { tasks, addTask } = useTasks()
    addTask({ title: 'Тест', subject: 'Math', deadline: '2026-05-20', priority: 'low' })
    expect(tasks.value[0].id).toBeDefined()
    expect(tasks.value[0].createdAt).toBeDefined()
  })

  it('removeTask — видаляє завдання за id', () => {
    const { tasks, addTask, removeTask } = useTasks()
    addTask({ title: 'Видалити мене', subject: 'IT', deadline: '2026-05-20', priority: 'low' })
    const id = tasks.value[0].id
    removeTask(id)
    expect(tasks.value).toHaveLength(0)
  })

  it('toggleDone — змінює статус done на протилежний', () => {
    const { tasks, addTask, toggleDone } = useTasks()
    addTask({ title: 'Тест', subject: 'IT', deadline: '2026-05-20', priority: 'low' })
    const id = tasks.value[0].id
    toggleDone(id)
    expect(tasks.value[0].done).toBe(true)
    toggleDone(id)
    expect(tasks.value[0].done).toBe(false)
  })

  it('toggleDone — нічого не робить якщо id не існує', () => {
    const { tasks, addTask, toggleDone } = useTasks()
    addTask({ title: 'Тест', subject: 'IT', deadline: '2026-05-20', priority: 'low' })
    expect(() => toggleDone(99999)).not.toThrow()
    expect(tasks.value).toHaveLength(1)
  })

})