const events = require('events');
const net = require('net');
const channel = new events.EventEmitter();

channel.clients = {};
channel.subscriptions = {};

channel.setMaxListeners(50);

channel.on('join', (id, client) => {
    channel.clients[id] = client;
    const welcome = `
        Welcome!
            Guests online: ${channel.listeners('broadcast').length}
        `;
    client.write(`${welcome}\n`);

    channel.subscriptions[id] = (senderId, message) => {
        if (id != senderId) {
            channel.clients[id].write(message);
        }
    }

    channel.on('broadcast', channel.subscriptions[id]);
});

channel.on('leave', (id) => {
    channel.removeListener(
        'broadcast', channel.subscriptions[id]
    );
    channel.emit('broadcast', id, `${id} has left the chatroom.\n`);
});

channel.on('shutdown', function () {
    channel.emit('broadcast', '', 'The server has shut down.\n');
    channel.removeAllListeners('broadcast');
})

const server = net.createServer((client) => {
    const id = `${client.remoteAddress}:${client.remotePort}`;
    channel.emit('join', id, client);
    client.on('data', (data) => {
        data = data.toString();
        if (data === 'shutdown\r\n') {
            channel.emit('shutdown');
        }
        channel.emit('broadcast', id, data);
    })

    client.on('close', () => {
        channel.emit('leave', id);
    });
});


server.listen(8888);