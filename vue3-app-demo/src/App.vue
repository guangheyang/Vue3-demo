<template>
  <h1>count: {{ countRef }}</h1>
	<button	@click="increase">increase</button>
	<button	@click="decreast">decreast</button>
</template>
<script>
import { ref } from 'vue'
function useCount() {
  let countRef = ref(0)
  const increase = () => {
    countRef.value ++
  }
  const decreast = () => {
    countRef.value --
  }
  return {
    increase,
    decreast,
    countRef
  }
}
export default {
  setup() {
    console.log("在所有生命周期钩子函数之前调用")
    console.log(this) // this -> undefined
    // let count = ref(0)
    // let countRef = ref(0)
    // const increase = () => {
    //     countRef.value++
    //     console.log(countRef, 'increase')
    // }
    return {
      // increase,
      // countRef
      // count
      ...useCount()
    }
  }
}
</script>