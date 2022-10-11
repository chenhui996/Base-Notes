const net = require('net')

const server = net.createServer(socket => {
    socket.on('data', data => { // 当读取到 新数据 时，处理的 data 事件
        socket.write(data); // 数据被写回到客户端
    })
})

server.listen(8888)