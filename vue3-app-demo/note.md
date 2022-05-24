# vuex方案

安装`vuex@4.x`

两个重要变动：

- 去掉了构造函数`Vuex`，而使用`createStore`创建仓库
- 为了配合`composition api`，新增`useStore`函数获得仓库对象

# global state

由于`vue3`的响应式系统本身可以脱离组件而存在，因此可以充分利用这一点，轻松制造多个全局响应式数据

[![image-20201026171519761](https://camo.githubusercontent.com/1ec49b2b2f07f03f77327b2b3382fff91d48ffc9f032789187af5ad7614ff078/687474703a2f2f6d6472732e7975616e6a696e2e746563682f696d672f32303230313032363137313531392e706e67)](https://camo.githubusercontent.com/1ec49b2b2f07f03f77327b2b3382fff91d48ffc9f032789187af5ad7614ff078/687474703a2f2f6d6472732e7975616e6a696e2e746563682f696d672f32303230313032363137313531392e706e67)

```
// store/useLoginUser 提供当前登录用户的共享数据
// 以下代码仅供参考
import { reactive, readonly } from "vue";
import * as userServ from "../api/user"; // 导入api模块
// 创建默认的全局单例响应式数据，仅供该模块内部使用
const state = reactive({ user: null, loading: false });
// 对外暴露的数据是只读的，不能直接修改
// 也可以进一步使用toRefs进行封装，从而避免解构或展开后响应式丢失
export const loginUserStore = readonly(state);

// 登录
export async function login(loginId, loginPwd) {
  state.loading = true;
  const user = await userServ.login(loginId, loginPwd);
  state.loginUser = user;
  state.loading = false;
}
// 退出
export async function loginOut() {
  state.loading = true;
  await userServ.loginOut();
  state.loading = false;
  state.loginUser = null;
}
// 恢复登录状态
export async function whoAmI() {
  state.loading = true;
  const user = await userServ.whoAmI();
  state.loading = false;
  state.loginUser = user;
}
```

# Provide&Inject

在`vue2`中，提供了`provide`和`inject`配置，可以让开发者在高层组件中注入数据，然后在后代组件中使用

[![image-20201026173949874](https://camo.githubusercontent.com/e40f3619ad36455b409c74068ee29801584e7dab0f96f40322f3f4b8030d0d52/687474703a2f2f6d6472732e7975616e6a696e2e746563682f696d672f32303230313032363137333934392e706e67)](https://camo.githubusercontent.com/e40f3619ad36455b409c74068ee29801584e7dab0f96f40322f3f4b8030d0d52/687474703a2f2f6d6472732e7975616e6a696e2e746563682f696d672f32303230313032363137333934392e706e67)

除了兼容`vue2`的配置式注入，`vue3`在`composition api`中添加了`provide`和`inject`方法，可以在`setup`函数中注入和使用数据

[![image-20201026174039594](https://camo.githubusercontent.com/aa092a872c541d03998533f57a3246e492e9c96664c018d98c4ea485a7b7f81d/687474703a2f2f6d6472732e7975616e6a696e2e746563682f696d672f32303230313032363137343033392e706e67)](https://camo.githubusercontent.com/aa092a872c541d03998533f57a3246e492e9c96664c018d98c4ea485a7b7f81d/687474703a2f2f6d6472732e7975616e6a696e2e746563682f696d672f32303230313032363137343033392e706e67)

考虑到有些数据需要在整个vue应用中使用，`vue3`还在应用实例中加入了`provide`方法，用于提供整个应用的共享数据

```
creaetApp(App)
  .provide("foo", ref(1))
  .provide("bar", ref(2))
	.mount("#app");
```

[![image-20201026174611477](https://camo.githubusercontent.com/03e730cea3e471d094f80a7c4a0242a15a2476220ea96aa8dca9cb8196cb1c8a/687474703a2f2f6d6472732e7975616e6a696e2e746563682f696d672f32303230313032363137343631312e706e67)](https://camo.githubusercontent.com/03e730cea3e471d094f80a7c4a0242a15a2476220ea96aa8dca9cb8196cb1c8a/687474703a2f2f6d6472732e7975616e6a696e2e746563682f696d672f32303230313032363137343631312e706e67)

因此，我们可以利用这一点，在整个vue应用中提供共享数据

```
// store/useLoginUser 提供当前登录用户的共享数据
// 以下代码仅供参考
import { readonly, reactive, inject } from "vue";
const key = Symbol(); // Provide的key

// 在传入的vue应用实例中提供数据
export function provideStore(app) {
  // 创建默认的响应式数据
  const state = reactive({ user: null, loading: false });
  // 登录
  async function login(loginId, loginPwd) {
    state.loading = true;
    const user = await userServ.login(loginId, loginPwd);
    state.loginUser = user;
    state.loading = false;
  }
  // 退出
  async function loginOut() {
    state.loading = true;
    await userServ.loginOut();
    state.loading = false;
    state.loginUser = null;
  }
  // 恢复登录状态
  async function whoAmI() {
    state.loading = true;
    const user = await userServ.whoAmI();
    state.loading = false;
    state.loginUser = user;
  }
  // 提供全局数据
  app.provide(key, {
    state: readonly(state), // 对外只读
    login,
    loginOut,
    whoAmI,
  });
}

export function useStore(defaultValue = null) {
  return inject(key, defaultValue);
}

// store/index
// 应用所有store
import { provideStore as provideLoginUserStore } from "./useLoginUser";
// 继续导入其他共享数据模块...
// import { provideStore as provideNewsStore } from "./useNews"

// 提供统一的数据注入接口
export default function provideStore(app) {
  provideLoginUserStore(app);
  // 继续注入其他共享数据
  // provideNewsStore(app);
}

// main.js
import { createApp } from "vue";
import provideStore from "./store";
const app = createApp(App);
provideStore(app);
app.mount("#app");
```

# 对比

|              | vuex | global state | Provide&Inject |
| ------------ | ---- | ------------ | -------------- |
| 组件数据共享 | ✅    | ✅            | ✅              |
| 可否脱离组件 | ✅    | ✅            | ❌              |
| 调试工具     | ✅    | ❌            | ✅              |
| 状态树       | ✅    | 自行决定     | 自行决定       |
| 量级         | 重   | 轻           | 轻             |