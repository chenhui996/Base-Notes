const events = require('events');
const net = require('net');
const channel = new events.EventEmitter();

channel.clients = {};
channel.subscriptions = {};

channel.setMaxListeners(50);

channel.on('join', function (id, client) {
    this.clients[id] = client; // 添加join事件的监听器，保存用户的client对象，以便程序可以将数据发送
    const welcome = `
        Welcome!
            Guests online: ${this.listeners('broadcast').length}
        `;
    client.write(`${welcome}\n`);

    this.subscriptions[id] = function (senderId, message) {
        if (id != senderId) { // 忽略发出这一广播数据的用户
            this.clients[id].write(message);
        }
    }

    this.on('broadcast', this.subscriptions[id]); // 添加一个专门针对当前用户的broadcast事件监听器
});

channel.on('leave', function (id) {   // 创建leave事件的监听器
    channel.removeListener(
        'broadcast', this.subscriptions[id]
    );
    channel.emit('broadcast', id, `${id} has left the chatroom.\n`);   // 移除指定客户端的broadcast监听器
});

channel.on('shutdown', function () {
    channel.emit('broadcast', '', 'The server has shut down.\n');
    channel.removeAllListeners('broadcast');
})

const server = net.createServer((client) => {
    const id = `${client.remoteAddress}:${client.remotePort}`;
    channel.emit('join', id, client); // 在服务器端记录用户的连接
    client.on('data', function (data) {
        data = data.toString();
        if (data === 'shutdown\r\n') {
            channel.emit('shutdown');
        }
        channel.emit('broadcast', id, data); // 广播数据
    });
    client.on('close', () => {
        channel.emit('leave', id);   // 在用户断开连接时发出leave事件
    });
});

server.listen(8888);