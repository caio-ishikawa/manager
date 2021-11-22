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

const video_users = {};

// ESTABLISHES SOCKET CONNECTIONS //
io.on('connection', socket => {
    let server_room; 
    let video_room;
    let user;

    // Join server //
    socket.on("join", ({roomName, email}) => {
        socket.join(roomName);
        server_room = roomName
        user = email;
        io.sockets.in(roomName).emit("join", ({email}));
        console.log(user, "has joined", roomName);
    });
    // Send message to server //
    socket.on("message", ({ message, email, room, pic}) => {
        console.log(socket.id, "sent msg", message)
        io.sockets.in(room).emit('message', {message, email, pic});
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
    });
    // Emits when user is added to server //
    socket.on("added", ({ room, email}) => {
        console.log(email, "has been added to: ", room);
        io.sockets.in(room).emit("added", ({ email }));
    });
    socket.on("uploaded", ({ room, email, fileName, fileKey }) => {
        console.log(email, "has uploaded", fileName, "to server");
        io.sockets.in(room).emit("uploaded", ({ email, fileName, fileKey }));
    });
    socket.on("disconnect", ( data ) => {
        io.emit("user left", ( user ));
        console.log(user, " has disconnected");
    });
    socket.on("joined video", ({ room, email }) => {
        if (email === undefined ) {
            console.log("email undefined");
            return;
        }
        console.log(email, " has joined video room: ", room);
        video_room = room;
        if (video_users[room]) {
            const length = video_users[room].length;
            if (length === 4) {
                socket.emit("full room");
                return;
            }
            video_users[room].push(socket.id);
        } else {
            video_users[room] = [socket.id];
        }
        const usersInTheRoom = video_users[room].filter(id => id !== socket.id);
        console.log("ROOM USERS: ", usersInTheRoom);
        socket.join(video_room);
        io.sockets.in(video_room).emit("all users", ({ usersInTheRoom }));
    });
    socket.on("exit video", ({ room, email }) =>{
        console.log(email, " has left video room: ", room);
        socket.leave("heyGeneral");
        if (video_users[room].includes(user)){
            let idx = video_users[room].indexOf(user);
            video_users[room].splice(idx, 1);
        } 
        socket.leave(video_room);
    });
    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });
    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit("receiving returned signal", { signal: payload.signal, id: socket.id })
    })

    
})

// SERVER LISTEN //
server.listen(PORT, () => {
    console.log("Server running on port: " + PORT);
});