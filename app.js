const Koa = require("koa");
const app = new Koa();
const jwt = require("koa-jwt");

const router = require("koa-router")({
  prefix: "/api",
});
const json = require("koa-json");
const logger = require("koa-logger");
const path = require("path");
const serve = require("koa-static");
const historyApiFallback = require("koa-connect-history-api-fallback"); // 引入依赖

const withAuth = require("./server/routes/auth.js");
const withApi = require("./server/routes/api.js");
// 静态文件serve在koa-router的其他规则之上

app.use(require("koa-bodyparser")());
app.use(json());
app.use(logger());
withAuth(router);
withApi(router, jwt({ secret: "vue-koa-demo" }));

app.use(router.routes()).use(router.allowedMethods());
app.use(historyApiFallback()); // //
app.use(serve(path.resolve("dist"))); // 将webpack打包好的项目目录作为Koa静态文件服务的目录

app.use(async function(ctx, next) {
  let start = new Date();
  await next();
  let ms = new Date() - start;
  console.log("%s %s - %s", this.method, this.url, ms); // 显示执行的时间
});
app.use(async function(ctx, next) {
  //  如果JWT验证失败，返回验证失败信息
  try {
    await next();
  } catch (err) {
    if (401 == err.status) {
      this.status = 401;
      this.body = {
        success: false,
        token: null,
        info: "Protected resource, use Authorization header to get access",
      };
    } else {
      throw err;
    }
  }
});

app.on("error", function(err, ctx) {
  console.log("server error", err);
});

app.listen(8889, () => {
  console.log("Koa is listening in 8889");
});

module.exports = app;
