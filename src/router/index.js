import { createRouter, createWebHistory } from "vue-router";
// import App from "../App.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/TodoList",
    name: "TodoList",
    component: () => import("../views/TodoList.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("demo-token");
  if (to.path == "/") {
    if (token != "null" && token != null) {
      next("/todolist");
    }
    next();
  } else {
    if (token != "null" && token != null) {
      // Vue.prototype.$http.defaults.headers.common["Authorization"] =
      //   "Bearer" + token;
      // App.config.globalProperties.$http.defaults.headers.common[
      //   "Authorization"
      // ] = "Bearer" + token;
      // app.config.globalProperties.$axios = axios
      next();
    } else {
      next("/");
    }
  }
});
export default router;
