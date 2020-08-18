const Koa = require("koa");
const KoaRouter = require("koa-router");
const Views = require("koa-views");
const KoaStatic = require("koa-static");
const KoaStiaticCache = require("koa-static-cache");
const Router = require("koa-router");

const server = new Koa();
const router = new Router();

// server.use(async (ctx) => {
//   ctx.body = "hello world";
// });

server.use(Views(__dirname + "/views"), {
  map: {
    html: "pug",
  },
});

server.use(KoaStatic(__dirname + "/static"));
router.get("/login", async (ctx, next) => {
  await ctx.render("login.pug");
});

server.use(router.routes());
server.listen(8081, () => {
  console.log("server running at http://localhost:8081");
});
