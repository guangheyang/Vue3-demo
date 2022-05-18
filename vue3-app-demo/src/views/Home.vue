<template>
  <div class="container">
    <div class="block">
      <h2>区域1</h2>
      <p>
        <button @click="modelVisible = true">打开朦层</button>
      </p>
      <teleport to='body'>
         <Model v-if="modelVisible">
          <button @click="modelVisible = false">关闭朦层</button>
        </Model>
      </teleport>
    </div>
    <div class="block mid">
      <h2>区域2</h2>
    </div>
    <div class="block big">
      <Block3 />
    </div>
    <div class="block big"><h2>区域4</h2></div>
    <div class="block mid">
      <Block5 />
    </div>
    <div class="block"><h2>区域6</h2></div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Model from '../components/Model.vue'
import { getAsyncComponent } from '../util'
// vue3日常开发时的写法
// const Block3 = defineAsyncComponent(() => import("../components/Block3.vue"));

// const Block3 = defineAsyncComponent(async () => {
//   await delay()
//   return import("../components/Block3.vue")
// });
// const Block3 = defineAsyncComponent({
//   loader: async () => {
//     await delay();
//     if (Math.random() < 0.5) {
//       throw new Error()
//     }
//     return import("../components/Block3.vue")
//   },
//   // 当promise在pending状态时，将显示这里的组件
//   loadingComponent: Loading,
//   errorComponent: {
//     render() {
//       return h(Erroring, '出错了！！！')
//     }
//   }
// });
const Block3 = getAsyncComponent('../components/Block3.vue')
const Block5 = getAsyncComponent('../components/Block5.vue')
export default {
  components: {
    Block3,
    Block5,
    Model
  },
  setup() {
    const modelVisibleRef = ref(false)
    return {
      modelVisible: modelVisibleRef
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  flex-wrap: wrap;
  padding: 0 50px;
  justify-content: space-between;
}
.block {
  width: 200px;
  margin: 15px;
  height: 250px;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.mid {
  width: 300px;
}
.big {
  width: 400px;
}
</style>