const user = require("../models/user.js");
const jwt = require("koa-jwt"); // 引入koa-jwt
const bcrypt = require("bcryptjs");

const getUserInfo = function*() {
  const id = this.params.id;
  const result = yield user.getUserById(id);
  this.body = result;
};

const postUserAuth = function*() {
  const data = this.request.body; // post过来的数据存在于request.body
  const userInfo = yield user.getUserByName(data.name);

  if (userInfo != null) {
    // if (userInfo.password != data.password) {
    if (!bcrypt.compareSync(data.password, userInfo.password)) {
      this.body = {
        success: false, // success 标志位是方便前端判断返回是正确与否
        info: "密码错误",
      };
    } else {
      const userToken = {
        name: userInfo.user_name,
        id: userInfo.id,
      };
      const secret = "vue-koa-demo"; //指定秘钥。这是之后用来判断token合法性得1标志
      const token = jw.sign(userToken, secret);
      this.body = {
        success: true,
        token: token, // 返回token
      };
    }
  } else {
    this.body = {
      success: false,
      info: "用户不存在", // 如果用户不存在返回用户不存在
    };
  }
};
module.exports = {
  getUserInfo,
  postUserAuth,
};
