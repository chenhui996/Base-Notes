const Koa = require("koa");
const KoaStaticCache = require("koa-static-cache");
const app = new Koa();
const moment = require('moment');

app.use(
  KoaStaticCache("public", {
    prefix: "/public",
    gzip: true,
    dynamic: true,
  })
);

const users = [];

// 这是原始http搭建的服务器，但是返回的是app;
const server = require("http").createServer(app.callback());
const options = {
  /* ... */
};
// io的第一个参数服务器，需要原始的http，不能用直接用koa;
const io = require("socket.io")(server, options);

io.on("connection", (socket) => {
    users.push({
        id: socket.id,
        // userName:socket.userName
    });
  console.log("有人通过socket连接了");
  let d = moment(new Date()).format('YYYY-MM-DD');
  console.log(d);
  // 通知当前的socket
  socket.emit('hello', `wellcome ${socket.id}[${d}]`);
  
  socket.emit('userUpdate', users);

  // 通过socket通知给其他socket
  socket.broadcast.emit('hello', `New ${socket.id}[${d}],Ye!`);

  socket.on('message', data=>{
    socket.broadcast.emit('message', `${socket.id} say : ${data}`);
  });
});

server.listen(8081, () => {
  console.log("Server running at http://localhost:8081");
});
