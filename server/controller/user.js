const user = require("../models/user.js");

const getUserInfo = function*() {
  const id = this.params.id;
  const result = yield user.getUserById(id);
  this.body = result;
};

module.exports = {
  getUserInfo,
};
