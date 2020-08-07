const Koa = require("koa");
const Router = require("koa-router");
const views = require("koa-views");

const hostname = "127.0.0.1";
const port = 3001;

let app = new Koa();
let router = new Router();
app.use(views(__dirname+"/views",()=>{
    map:{
        html:"pug"
    }
}));
router.get("/",async ctx => {
    // ctx.body = "hello";
    await ctx.render("index.pug");
})
app.use(router.routes());
app.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});