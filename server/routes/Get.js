const router = require('express').Router();
const Server = require('../models/Server');
const User = require('../models/User');
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

module.exports = router;