const LOCAL_KEY = 'todomvc'

/**
 * 
 * 获取当前所有任务 
 */
export function fetch() {
  const todoList = localStorage.getItem(LOCAL_KEY)
  if (todoList) {
    return JSON.parse(todoList)
  }
  return []
}

/**
 * 保存任务
 */
export function save(todos) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(todos))
}

export function generateId() {
  return Date.now() + Math.random().toString(16).substring(2, 4)
}

export function filter(todos, visibility = 'all') {
  if (visibility === 'all') {
    return todos
  } else if (visibility === 'active') {
    return todos.filter(it => !it.completed)
  } else if (visibility === 'completed') {
    return todos.filter(it => it.completed)
  }
  throw new Error('invalld visibility value')
}