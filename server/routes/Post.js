const router = require('express').Router();
const Server = require('../models/Server');
const User = require('../models/User');
const Chat = require('../models/Chat');
const { emailExists } = require('../utils/emailExists');


router.post('/add_server', async(req, res) => {
    const email = req.body.email;
    const serverName = req.body.name;
    const defaultChannel = "General"; 

    if (!emailExists(email)) {
        res.send("ERROR - INVALID EMAIL");
    } else {
        // Create server //
        const newServer = new Server({
            name: serverName,
            created_by: email
        });

        // Look for server's creator's data //
        const serverUser = await User.findOne({ email: email });

        try {
            // Saves server and adds server name to the User Schema //
            serverUser.servers.push(serverName);
            newServer.members.push(email);
            const savedUser = serverUser.save();
            const savedServer = newServer.save()
            res.send(newServer);
            console.log(serverUser);
        } catch(err) {
            res.send(err);
        }
    }
});

router.post('/add_user', async(req, res) => {
    const email = req.body.email;
    const serverName = req.body.server;

    const user = await User.findOne({ email: email });
    const server = await Server.findOne({ name: serverName });
    if (!user) {
        res.status(400).send("No user found");
    } else {
        const updatedUser = user.servers.push(serverName);
        const updatedServer = server.members.push(email);
        const savedUSer = user.save();
        const savedServer = server.save();
        res.send(user);
    }
});

router.post('/chat', async (req, res) => {
    const email = req.body.email;
    const server = req.body.server;
    const message = req.body.message;

    const newMessage = new Chat({
        user: email,
        message: message,
        server: server
    });

    try{
        const savedChat = await newMessage.save();
        res.send(newMessage);
    } catch(err) {
        res.send(err);
    }
});


module.exports = router;