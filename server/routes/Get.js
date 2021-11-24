const router = require('express').Router();
const Server = require('../models/Server');
const User = require('../models/User');
const Chat = require('../models/Chat');
const { emailExists } = require('../utils/emailExists');

// GET USER's SUBSCRIBED SERVERS //
router.get('/servers', async(req, res) => {
    const email = req.query.email;

    if (!emailExists(email) || !email) {
        res.status(400).send("NOT LOGGED IN");
    } else {
        const user = await User.findOne({ email: email });
        const userServers = user.servers;
        const picArr = [];

        for (var i = 0; i < userServers.length; i++) {
            let server = await Server.findOne({ name: userServers[i]});
            picArr.push(server.picture);
        };

        let data = userServers.map((server, idx) => {
            return {server: server, pic: picArr[idx]};
        })

        if (userServers.length > 0) {
            res.send(data);
        } else {
            res.send("User is not in any server");
        }
    }
});

router.get('/all_members', async (req, res) => {
    const email = req.query.email;
    const serverName = req.query.server;

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
router.get('/server_msgs', async (req, res) => {
    const serverName = req.query.server;
    const channelID = req.query.channel;
    console.log({ serverName, channelID });
    
    const chat = await Chat.find({ server: serverName, channel: channelID  });
    res.send(chat);
});

router.get('/user_details', async (req, res) => {
    const email = req.query.email;

    const user = await User.findOne({ email: email });
    if (!user) {
        res.status(400).send("Error");
    } else {
        res.send(user);
    }
});

router.get("/channels", async (req, res) => {
    const serverName = req.query.server;

    let server = await Server.findOne({ name: serverName });
    res.send(server.channels);
})

module.exports = router;