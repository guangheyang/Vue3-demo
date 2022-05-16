<template>
  <div id="app">
    <div class="container">
      <div class="list">
        <strong>编辑：</strong>
        <div class="list">
          <!-- <CheckEditor :modelValue="checked" @update:modelValue="checked = $event"></CheckEditor> -->
          <CheckEditor
            v-for="item in products"
            :key="item.id"
            v-model="item.sell"
            v-model:title.trim="item.title"
          />
        </div>
      </div>
      <div class="list">
        <strong>销售中:</strong>
        <div>
          <template v-for="(item, index) in sells" :key="item.id">
            <span>{{ index + 1 }}.</span>
            <strong>{{ item.title }}</strong>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
const tasksRef = [
  {
    id: 1,
    sell: true,
    title: "iphone12",
  },
  { id: 2, sell: false, title: "xiaomi" },
  { id: 3, sell: true, title: "huawei" },
  { id: 4, sell: true, title: "vivo" },
];
import CheckEditor from "./components/CheckEditor.vue";
export default {
  setup() {
    const productsRef = ref(tasksRef);
    const sellsRef = computed(() => productsRef.value.filter(it => it.sell))
    return {
      products: productsRef,
      sells: sellsRef
    };
  },
  components: {
    CheckEditor,
  },
  data() {
    return {
      checked: true,
      title: "xiaomi",
    };
  },
};
</script>
<style>
.container {
  margin-top: 50px;
  width: 880px;
  margin: 50px auto;
}

.list {
  display: flex;
  margin: 1em 0;
  align-items: center;
}

strong {
  margin-right: 1em;
}
</style>