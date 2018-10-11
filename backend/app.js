const express = require('express');
const app = express();
const socket = require('socket.io');

const server = app.listen(8080, () => {
    console.log('Express backend listening on: *8080');
});

io = socket(server);
io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('SEND_MESSAGE', (data) => {
        io.emit('RECIEVE_MESSAGE', data);
    })
})

app.get('/', (req, res) => {
    res.send('Yeet');
})