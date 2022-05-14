## vue3与vue2的不同

1. vue3不存在构造函数Vue，vue3与vue2之间的的迭代称之为breaking（截断式更新）

   ```JS
   // vue2 的 main.js
   import Vue from 'vue'
   import App from './App,vue'
   const app = new Vue(options)
   Vue.use(...)
   app.$mount('#app')
   ```

   ```js
   // vue3 的 main.js
   import { createApp } from 'vue' //使用具名导入的方式
   import App from './App,vue'
   const app = createApp(App)
   Vue.use(...)
   app.mount('#app')
   ```

   

2. vue3对组件实例进行代理处理

   vue2访问某一属性，直接获取组件实例的属性值并返回

   vue3访问某一属性，要先访问这个组件实例的代理对象，通过这个组件的代理对象去访问组件实例上间接获取这一属性，

   **访问this属性不在返回组件实例而是返回组件的代理对象**

   

3. vue3 的 composttion api 与 vue2 的option api

   ```vue
   // vue2
   <template>
   	<button	@click="increase">count: {{ count }}</button>
   </template>
   <script>
   export default {
     data() {
       return {
         count: 0
       }
     },
     methods: {
       increase() {
         this.count = this.count++
       }
     }
   }
   </script>
   ```

   ```vue
   // vue3
   <template>
   	<button	@click="increase">count: {{ count }}</button>
   </template>
   <script>
   import { ref } from 'vue' // 实现响应式
   export default {
     setup() {
       console.log("在所有生命周期钩子函数之前调用")
       console.log(this) // this -> undefined
       let countRef = ref(0)
       const increase = () => {
           countRef.value++
           console.log(countRef, 'increase')
       }
       return {
           increase,
           count
       }
     }
   }
   </script>
   ```

   **对ref的特殊处理**访问count时通过代理对象访问组件实例的count.value，在setup中是一个对象，在实例代理中是count.value

4. 可以存在多个根节点

