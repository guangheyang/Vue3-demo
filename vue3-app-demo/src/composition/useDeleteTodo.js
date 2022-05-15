export default function useDeleteTodo(todosRef) {
  const clearCompleted = () => {
    todosRef.value = todosRef.value.filter(item => !item.completed)
  }
  const deleteTodo = (todo) => {
    todosRef.value.splice(todosRef.value.indexOf(todo), 1)
  }
  return {
    clearCompleted,
    deleteTodo
  }
}