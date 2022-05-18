import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.js'
export default createRouter({
  // 相当于vue2 mode: 'history', createWebHistory可传入参数，可作为为baseUrl
  history: createWebHistory(),
  routes
})