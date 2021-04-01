const todolist = require("../models/todolist.js");

const getTodolist = async function(ctx) {
  const id = ctx.params.id; //获取url里传过来的参数id
  const result = await todolist.getTodolistById(id);
  ctx.body = result;
};
const createTodolist = async function(ctx) {
  const data = ctx.request.body;
  const result = await todolist.createTodolist(data);

  ctx.body = {
    success: true,
  };
};
const deleteTodolist = async function(ctx) {
  const id = ctx.params.id;
  const user_id = ctx.params.userId;
  const result = await todolist.deleteTodolist(id, user_id);
  ctx.body = "删除成功！";
};
const updateTodolist = async function(ctx) {
  const id = ctx.params.id;
  const user_id = ctx.params.userId;
  const status = ctx.params.status;
  console.log("ctx.params.status", ctx.params.status);
  // status == 0 ? (status = true) : (status = false);

  const result = await todolist.updateTodolist(id, user_id, status);
  ctx.body = "更新成功！";
};
module.exports = {
  getTodolist,
  createTodolist,
  deleteTodolist,
  updateTodolist,
};
