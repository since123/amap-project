const db = require("../config/db.js");
const userModel = "../schema/user.js";
const TestDb = db.Test;

// const User = TestDb.import(userModel);
const User = require(userModel)(TestDb);

const getUserById = function*(id) {
  const userInfo = yield User.findOne({
    where: {
      id: id,
    },
  });
  return userInfo;
};
const getUserByName = function*(name) {
  const userInfo = yield User.findOne({
    where: {
      user_name: name,
    },
  });
  return userInfo;
};
module.exports = {
  getUserById,
  getUserByName,
};
