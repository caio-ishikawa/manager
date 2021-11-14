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
        const newServer = new Server({
            name: serverName,
            created_by: email
        });

        try {
            const savedServer = await newServer.save()
            res.send(newServer);
        } catch(err) {
            res.send(err);
        }
    }
});


module.exports = router;