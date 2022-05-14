<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodoRef"
          @keyup.enter="addTodo"
        />
      </header>
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li class="todo" :class="{ completed: todo.completed }" v-for="todo in filterdTodosRef" :key="todo.id">
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label>{{ todo.title }}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" type="text" />
          </li>
          <!-- <li class="todo">
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label>投递50封简历</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" type="text" />
          </li>
          <li class="todo">
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label>上午10:30 参加面试</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" type="text" />
          </li> -->
        </ul>
      </section>
      <footer class="footer">
        <span class="todo-count">
          <strong>{{ remainingRef }}</strong>
          <span>item{{ remainingRef === 1 ? '' : 's' }} left</span>
        </span>
        <ul class="filters">
          <li><a href="#/all" :class="{ selected: visibilityRef === 'all' }">All</a></li>
          <li><a href="#/active" :class="{ selected: visibilityRef === 'active' }">Active</a></li>
          <li><a href="#/completed" :class="{ selected: visibilityRef === 'completed' }">Completed</a></li>
        </ul>
        <button v-show="completedRef > 0" class="clear-completed">
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>
<script>
import useTodoList from './composition/useTodoList'
import useNewTodo from './composition/useNewTodo'
import useFilter from './composition/useFilter'
export default {
  setup() {
   const { todosRef } = useTodoList()
    return {
      ...useNewTodo(todosRef),
      ...useFilter(todosRef)
    }
  }
};
</script>