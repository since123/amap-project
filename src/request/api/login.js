//  首页管理模块接口列表
import base from "../base";
import axios from "../http";

const loginPage = {
  // 登录
  login(params) {
    return axios.post(`${base.baseUrl1}/api/user`, params);
    //或者 return axios.post(`api/user`, params); 因为vue.config.js里面已经配了默认8080
  },
};
export default loginPage;
