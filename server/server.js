const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const secrets = require('./secrets');
const http = require('http')
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server, {
    cors: {
        origin: '*'
    }
});

let users = [];

// EXPRESS + CORS SETUP //
const PORT = 3002;
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// ROUTES //
const authRoutes = require('./routes/Auth');
const postRoutes = require('./routes/Post');
const getRoutes = require('./routes/Get');
app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/get', getRoutes);

// DATABASE CONNECTION //
mongoose.connect(secrets, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to DB.");
    }
});

// ESTABLISHES SOCKET CONNECTIONS //
io.on('connection', socket => {
    socket.on("join", (roomName) => {
        socket.join(roomName);
        console.log("you have joined", roomName);
    });
    socket.on("message", ({ message, email, room}) => {
        io.sockets.in(room).emit('message', {message, email});
    })
})

// SERVER LISTEN //
server.listen(PORT, () => {
    console.log("Server running on port: " + PORT);
});