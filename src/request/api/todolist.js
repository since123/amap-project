import base from "../base";
import axios from "../http";
const todolist = {
  // 查询todolist
  queryTodoList(params) {
    return axios.get(`${base.baseUrl1}/api/queryTodoList`, { params: params });
  },
};
export default todolist;
