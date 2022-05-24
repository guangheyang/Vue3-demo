import { createApp } from "vue";
import router from './router';
import App from "./App.vue";
import { whoAmI } from './store/loginUser'

createApp(App).use(router).mount("#app");
whoAmI()