const router = require('express').Router();
const Server = require('../models/Server');
const User = require('../models/User');
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
            const savedServer = await newServer.save()
            serverUser.servers.push(serverName);
            const savedUser = serverUser.save();
            res.send(newServer);
            console.log(serverUser);
        } catch(err) {
            res.send(err);
        }
    }
});


module.exports = router;