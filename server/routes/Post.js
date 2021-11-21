const router = require('express').Router();
const Server = require('../models/Server');
const User = require('../models/User');
const Chat = require('../models/Chat');
const File = require('../models/File');
const { emailExists } = require('../utils/emailExists');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});
const { uploadFile } = require('../utils/s3'); 


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
    } else if (!server.members.includes(email)) {
        const updatedUser = user.servers.push(serverName);
        const updatedServer = server.members.push(email);
        const savedUSer = user.save();
        const savedServer = server.save();
        res.send("User added");
    } else {
        res.status(301).send("User already invited");
    }
});

router.post('/profile_pic', upload.single('file'), async (req, res) => {
    const email = req.body.email;
    const file = req.file;
    console.log(email);

    const fileUpload = await uploadFile(file);
    console.log(fileUpload);

    const user = await User.findOneAndUpdate({ email: email }, {profile_picture: fileUpload.Key});

    try{
        const savedUser = user.save();
        res.send(user);
    } catch (err) {
        res.send("Error");
    }
});

router.post('/chat', async (req, res) => {
    const email = req.body.email;
    const server = req.body.server;
    const message = req.body.message;

    // If file gets sent, save file to Chat model, else save message to Chat model //
    let newMessage = new Chat({
        user: email,
        message: message,
        server: server,
        picture: req.body.pic ? req.body.pic : undefined
    });

    try{
        console.log(req.body.pic)
        const savedMsg = await newMessage.save();
        res.send(savedMsg);
    } catch(err) {
        res.send(err);
    }
});


router.post('/update', async (req, res) => {
    const serverName = req.body.server;
    const update = req.body.update

    const server = await Server.findOne({ name: serverName });
    try {
        const updatedServer = server.updates.push(update);
        const savedServer = server.save();
        res.send("Update successfully stored.");
    } catch(err) {
        res.send("Error");
    }
});

router.post('/file', upload.single('file'), async (req, res) => {
    // NEEDS ERROR HANDLING //
    const file = req.file;
    const email = req.body.user;
    const serverName = req.body.server;

    // Uploads to S3 bucket //
    const fileUpload = await uploadFile(file);
    console.log(fileUpload)

    // Uploads image key to Chat model //
    let newImage = new Chat({
        user: email,
        file_key: fileUpload.Key,
        server: serverName 
    });

    try {
        let savedImg = await newImage.save();
    } catch (err) {
        res.send("Error");
        console.log("IMAGE DID NOT SAVE TO CHAT MODEL")
    }

    try {
        console.log(newImage);
        res.send(newImage);
    } catch (err) {
        res.status(400).send("Error");
        console.log("DID NOT WORK")
    }

});

module.exports = router;