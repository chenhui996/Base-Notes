const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');

const app = new Koa();
const router = new KoaRouter();

app.use(KoaStaticCache('static',{
    prefix: '/static',
    gzip: true,
    dynamic: true
}));

router.get('/check', async ctx=>{
    ctx.body = "检查登录";
});
router.get('/login', async ctx=>{
    ctx.body = "登录成功";
});

app.use(router.routes());
app.listen(8081,()=>{
    console.log("Server running at http://localhost:8081");
})