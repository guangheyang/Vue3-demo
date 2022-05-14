import { generateId } from '../util/todoStorage'
import { ref } from 'vue'
export default function useNewTodo(todosRef) {
  const newTodoRef = ref('') // 新增任务的标题
  const addTodo = () => {
    const value = newTodoRef.value && newTodoRef.value.trim()
    if (!value) return
    // 生成任务对象，加入到任务列表中
    const todo = {
      id: generateId(),
      title: value,
      completed: false
    }
    todosRef.value.push(todo)
    newTodoRef.value = ''
  }
  return {
    newTodoRef,
    addTodo
  }
}