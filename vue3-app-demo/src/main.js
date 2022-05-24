import { createApp } from "vue";
import router from './router';
import App from "./App.vue";
import provideStore from './store'

const app = createApp(App).use(router);
provideStore(app)
app.mount('#app')