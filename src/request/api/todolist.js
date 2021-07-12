import base from "../base";
import axios from "../http";
const todolist = {
  // 查询todolist
  queryTodoList(params) {
    return axios.get(`${base.baseUrl1}/api/todolist/` + params.userId);
  },
  createdTodolist(params) {
    return axios.post(`${base.baseUrl1}/api/createTodolist`, params);
  },
  deleteTodolist(params) {
    return axios.get(
      `${base.baseUrl1}/api/deleteTodolist/` + params.id + "/" + params.userId
    );
  },
  updateTodolist(params) {
    return axios.get(
      `${base.baseUrl1}/api/updateTodolist/` +
        params.id +
        "/" +
        params.userId +
        "/" +
        params.status
    );
  },
};
export default todolist;
