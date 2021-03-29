/**
 * api接口的统一出口
 * index.js是一个api接口的出口，
 * 这样就可以把api接口根据功能划分为多个模块，
 * 利于多人协作开发，比如一个人只负责一个模块的开发等，还能方便每个模块中接口的命名哦。
 */
import todolist from "./todolist";
import loginPage from "./login";

export default {
  todolist,
  loginPage,
};
