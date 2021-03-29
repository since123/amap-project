import Axios from "axios";

const axios = Axios.create();

axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("demo-token");
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.authorization = "Bearer" + token; //请求头加上token
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (response) => {
    if (response.status == 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    console.log("error", error);
  }
);
// 导出模块
export default axios;
