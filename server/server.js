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
const { SocketAddress } = require('net');
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
    let server_room; 
    // Join server //
    socket.on("join", ({roomName, email}) => {
        socket.join(roomName);
        server_room = roomName
        console.log(email, "has joined", roomName);
    });
    // Send message to server //
    socket.on("message", ({ message, email, room}) => {
        io.sockets.in(room).emit('message', {message, email});
    });
    // Emit when user is typing //
    socket.on("typing", ({ room, email }) => {
        console.log(email, 'is typing in room', room);
        io.sockets.in(room).emit("typing", { email });
    });
    // Emit when user stops typing //
    socket.on("stopped typing", ({ room, email }) => {
        io.sockets.in(room).emit("stopped typing", ({ email }));
    });
    // Leaves room before joining another //
    socket.on("swap servers", ( email ) => {
        console.log(email, "LEAVING SERVER: ", server_room);
        socket.leave(server_room);
    })
})

// SERVER LISTEN //
server.listen(PORT, () => {
    console.log("Server running on port: " + PORT);
});