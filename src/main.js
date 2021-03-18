import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import Axios from "axios";

VTTCue.prototype.$http = Axios; // 类似于vue-resource得调用方法，之后可以在实例里直接用this.$http.get()等

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .mount("#app");
