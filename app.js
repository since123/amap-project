const Koa = require("koa");
const app = new Koa();

const router = require("koa-router")({
  prefix: "/api",
});
const json = require("koa-json");
const logger = require("koa-logger");

const withAuth = require("./server/routes/auth.js");

app.use(require("koa-bodyparser")());
app.use(json());
app.use(logger());

app.use(async function(ctx, next) {
  let start = new Date();
  await next();
  let ms = new Date() - start;
  console.log("%s %s - %s", this.method, this.url, ms); // 显示执行的时间
});

app.on("error", function(err, ctx) {
  console.log("server error", err);
});

withAuth(router);
app.use(router.routes()).use(router.allowedMethods());

app.listen(8889, () => {
  console.log("Koa is listening in 8889");
});

module.exports = app;
