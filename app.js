const Koa = require("koa");
const app = new Koa();
(koa = require("koa-router")()),
  (json = require("koa-json")),
  (logger = require("koa-logger")), // 引入各种依赖
  (auth = require("./server/routes/auth.js"));

app.use(require("koa-bodyparser")());
app.use(json());
app.use(logger());

app.use(function*(next) {
  let start = new Date();
  yield next;
  let ms = new Date() - start;
  console.log("%s %s - %s", this.method, this.url, ms); // 显示执行的时间
});

app.on("error", function(err, ctx) {
  console.log("server error", err);
});

koa.use("/auth", auth.routes()); //挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。

app.use(koa.routes()); //  将路由规则挂载到koa上
app.listen(8889, () => {
  console.log("Koa is listening in 8889");
});

module.exports = app;
