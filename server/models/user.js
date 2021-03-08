const db = require("../config/db.js"),
  userModel = "../schema/user.js";
const TestDb = db.Test;

const User = TestDb.impot(userModel);

const getUserById = function*(id) {
  const userInfo = yield User.findOne({
    where: {
      id: id,
    },
  });

  return userInfo;
};

module.exports = {
  getUserById,
};
