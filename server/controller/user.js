const user = require("../models/user.js");
const jwt = require("jsonwebtoken"); // 引入koa-jwt
const bcrypt = require("bcryptjs");

const getUserInfo = async function() {
  const id = ctx.params.id;
  const result = await user.getUserById(id);
  ctx.body = result;
};

const postUserAuth = async function(ctx) {
  const data = ctx.request.body; // post过来的数据存在于request.body
  const userInfo = await user.getUserByName(data.name);

  if (userInfo != null) {
    // if (userInfo.password != data.password) {
    if (!bcrypt.compareSync(data.password, userInfo.password)) {
      ctx.body = {
        success: false, // success 标志位是方便前端判断返回是正确与否
        info: "密码错误",
      };
    } else {
      const userToken = {
        name: userInfo.user_name,
        id: userInfo.id,
      };
      const secret = "vue-koa-demo"; //指定秘钥。这是之后用来判断token合法性得1标志
      console.log("jwt", jwt);
      const token = jwt.sign(userToken, secret); // 签发token
      ctx.body = {
        success: true,
        token: token, // 返回token
      };
    }
  } else {
    ctx.body = {
      success: false,
      info: "用户不存在", // 如果用户不存在返回用户不存在
    };
  }
};
module.exports = {
  getUserInfo,
  postUserAuth,
};
