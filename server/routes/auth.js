const auth = require("../controller/user.js");

module.exports = function(router) {
  router.get("/user/:id", auth.getUserInfo);
  router.post("/user", auth.postUserAuth);
};
