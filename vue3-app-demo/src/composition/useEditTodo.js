import { ref, computed } from 'vue'
export default function useEditTodo(todoRef) {
  const editingTodoRef = ref(null) // 当前正在修改的todo
  let originTitle = null // 缓存之前的title值
  const editTodo = (todo) => {
    editingTodoRef.value = todo
    originTitle = todo.title
    console.log(originTitle, 'originTitle')
  }
  const doneEdit = () => {
    editingTodoRef.value = null
  }
  const cancelEdit = (todo) => {
    editingTodoRef.value = null
    todo.title = originTitle
    console.log(originTitle, 'originTitle')
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