import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
// import axios from "./request/http";
// import VueAxios from "vue-axios";

// 类似于vue-resource得调用方法，之后可以在实例里直接用this.$http.get()等

// const axios = Axios.create();

// axios.interceptors.request.use(
//   (config) => {
//     const token = sessionStorage.getItem("demo-token");
//     if (token) {
//       // 判断是否存在token，如果存在的话，则每个http header都加上token
//       config.headers.authorization = "Bearer" + token; //请求头加上token
//     }
//     return config;
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );

// router.beforeEach((to, from, next) => {
//   const token = sessionStorage.getItem("demo-token");
//   if (to.path == "/") {
//     if (token != "null" && token != null) {
//       next("/todolist");
//     }
//     next();
//   } else {
//     if (token != "null" && token != null) {
//       // Vue.prototype.$http.defaults.headers.common["Authorization"] =
//       //   "Bearer" + token;
//       // debugger;
//       // console.log(App);
//       // App.config.globalProperties.$http.defaults.headers.common[
//       //   "Authorization"
//       // ] = "Bearer" + token;
//       // app.config.globalProperties.$axios = axios
//       next();
//     } else {
//       next("/");
//     }
//   }
// });
createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  // .use(VueAxios, axios)
  .mount("#app");
