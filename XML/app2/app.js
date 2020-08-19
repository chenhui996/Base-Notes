const Koa = require("koa");
const KoaStaticCache = require("koa-static-cache");
const KoaRouter = require("koa-router");

const app = new Koa();
const router = new KoaRouter();

app.use(
  KoaStaticCache("static", {
    prefix: "/static",
    gzip: true,
    dynamic: true,
  })
);

//user
const users = ["cain", "snake"];
let user = null;

router.get("/check", async (ctx) => {
    if(!user){
        ctx.body = { code: -1, message: "还没登录" };
    }
    else{
        ctx.body = { code: 0, message: "登陆成功" };
    }
});
router.get("/login", async (ctx) => {
  user = {};
  ctx.body = "登录成功";
});

app.use(router.routes());
app.listen(8081, () => {
  console.log("Server running at http://localhost:8081");
});
