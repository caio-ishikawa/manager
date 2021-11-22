const router = require('express').Router();
const Server = require('../models/Server');
const User = require('../models/User');
const Chat = require('../models/Chat');
const { emailExists } = require('../utils/emailExists');

// GET USER's SUBSCRIBED SERVERS //
router.post('/servers', async(req, res) => {
    const email = req.body.email;

    if (!emailExists(email) || !email) {
        res.status(400).send("NOT LOGGED IN");
    } else {
        const user = await User.findOne({ email: email });
        const userServers = user.servers;

        if (userServers.length > 0) {
            res.send(userServers);
        } else {
            res.send("User is not in any server");
        }
    }
});

router.post('/all_members', async (req, res) => {
    const email = req.body.email;
    const serverName = req.body.server;

    if (!emailExists(email)) {
        res.status(400).send("NOT LOGGED IN");
    } else {
        const server = await Server.findOne({ name: serverName });
        const serverUsers = server.members;
        //res.send(server.members);
        let members = server.members;
        let userObj = [];

        for (var i = 0; i < members.length; i++) {
            let user = await User.findOne({ email: members[i] });
            let user_pic = user.profile_picture;
            let user_email = user.email;
            userObj.push({ "email":user_email, "pic":user_pic });
        }
        console.log(userObj);
        res.send(userObj);

    }
});

// Sends all chats pertaining to a specific server //
router.post('/server_msgs', async (req, res) => {
    const serverName = req.body.server;
    
    const chat = await Chat.find({ server: serverName });
    res.send(chat);
});


// Gets all server voice/video channels //
router.post('/all_channels', async(req, res) => {
    const serverName = req.body.server;

    let server = await Server.findOne({ name: serverName });
    res.send(server.channels);

});

router.post('/updates', async(req, res) => {
    const serverName = req.body.server;

    const server = await Server.findOne({ name: serverName });

    if (!server) {
        res.send("No updates")
    } else {
        
        res.send(server.updates);
    }
});

router.post('/file', async(req, res) => {
    const fileKey = req.body.fileKey;
    console.log(fileKey);
});

router.post('/user_details', async (req, res) => {
    const email = req.body.email;

    const user = await User.findOne({ email: email });
    if (!user) {
        res.status(400).send("Error");
    } else {
        res.send(user);
    }
    
});

module.exports = router;