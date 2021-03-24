const db = require("../config/db.js");
const userModel = "../schema/user.js";
const TestDb = db.Test;

// const User = TestDb.import(userModel);
const User = require(userModel)(TestDb);

const getUserById = async function(id) {
  const userInfo = await User.findOne({
    where: {
      id: id,
    },
  });
  return userInfo;
};
const getUserByName = async function(name) {
  const userInfo = await User.findOne({
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
