const db = require("../config/db.js");
const todoModel = "../schema/list.js";
const TestDb = db.Test;

const Todolist = require(todoModel)(TestDb);

// 获取某个用户的全部todolist
const getTodolistById = async function(id) {
  const todolist = await Todolist.findAll({
    where: {
      user_id: id,
    },
    attributes: ["id", "content", "status"],
  });
  return todolist; // 返回数据
};

const createTodolist = async function(data) {
  await Todolist.create({
    user_id: data.id,
    content: data.content,
    status: data.staus,
  });
  return true;
};
const deleteTodolist = async function(id, user_id) {
  await Todolist.destroy({
    where: {
      id,
      user_id,
    },
  });
  return true;
};
const updateTodolist = async function(id, user_id, status) {
  await Todolist.update(
    {
      status,
    },
    {
      where: {
        id,
        user_id,
      },
    }
  );
  return true;
};
module.exports = {
  getTodolistById,
  createTodolist,
  deleteTodolist,
  updateTodolist,
};
