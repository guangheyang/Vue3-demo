import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// nProgress.configure({
//   trickleSpeed: 50,
//   showSpinner: false
// })
// window.NProgress = NProgress
// console.log(nprogress)
createApp(App).use(router).mount('#app')
