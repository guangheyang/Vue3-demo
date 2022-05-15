import { ref, computed } from 'vue'
export default function useEditTodo(todoRef) {
  const editingTodoRef = ref(null) // 当前正在修改的todo
  // 缓存之前的title
  let originTitle = null
  const editTodo = (todo) => {
    editingTodoRef.value = todo
    originTitle = todo.title
  }
  const doneEdit = (todo) => {
    editingTodoRef.value = null
    const title = todo.title.trim()
    const index = todoRef.value.indexOf(todo)
    if (title) {
      todo.title = title
    } else {
      console.log(index)
      setTimeout(() => {
        todoRef.value.splice(index, 1)
      })
    }
  }
  const cancelEdit = (todo) => {
    editingTodoRef.value = null
    todo.title = originTitle
  }
  const allDoneRef = computed({
    get() {
      return todoRef.value.filter(it => !it.completed).length === 0
    },
    set(checked) {
      todoRef.value.forEach(todo => {
        todo.completed = checked
      })
    }
  })
  return {
    editingTodoRef,
    editTodo,
    doneEdit,
    cancelEdit,
    allDoneRef
  }
}