// import Home from '../views/Home.vue'
// import About from '../views/About.vue'

// export default [
//   { path: '/',component: Home },
//   { path: '/about',component: About },
// ]

import { getAsyncPage } from "../util";

export default [
  {
    path: "/",
    name: "Home",
    component: getAsyncPage("../views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: getAsyncPage("../views/About.vue"),
  },
];