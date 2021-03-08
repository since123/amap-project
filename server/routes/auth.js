const auth = require("../controller/user.js");
const router = require("koa-router")();

router.get("/user/:id", auth.getUserInfo);

module.exports = router; //把router规则暴露出去
