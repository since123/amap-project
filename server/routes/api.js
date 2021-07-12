const todolist = require("../controller/todolist.js");
// const router = require("koa-router")();
// console.log("todolist", todolist);
// todolist(router); //引入koa-router

module.exports = function(router) {
  router.get("/todolist/:id", todolist.getTodolist);
  router.post("/createTodolist", todolist.createTodolist);
  router.get("/deleteTodolist/:id/:userId", todolist.deleteTodolist);
  router.get("/updateTodolist/:id/:userId/:status", todolist.updateTodolist);
};

// module.exports = router;
