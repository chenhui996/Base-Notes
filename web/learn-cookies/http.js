const Koa = require("koa");

const port = 5624;
const hostname = "localhost";

const app = new Koa();

app.use(async(ctx)=>{
    if(ctx.url==='/index'){
        ctx.cookies.set('name','ahui',{
            domain:'localhost',     //写cookie所在的域名
            path:'/index',          //写cookie所在的路径
            maxAge:60*1000,         //写cookie有效时长
            expires:7,
            httpOnly:false,
            overwrite:false
        })
        ctx.body = 'cookie is ok'
    }else{
        ctx.body = 'hello world'
    }
})


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
