const socket = require('socket.io');
const router = require('express').Router();

router.post('/connect', (req, res) => {
    const server = req.body.server;
    var io = socket(server);
    io.sockets.on("connection", (socket) => {
        console.log(socket);
    })
});

module.exports = router;