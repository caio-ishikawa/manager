const router = require('express').Router();
const User = require('../models/User');
const { usernameExists } = require('../utils/usernameExists');
const { emailExists } = require('../utils/emailExists');
const bcrypt = require('bcrypt');


router.post('/register', async (req, res) => {
    const first = req.body.first_name;
    const last = req.body.last_name;
    const password = req.body.password;
    const email = req.body.email;

    if (emailExists(email) === true) {
        res.json({ "ERROR": "Email already exist."});
    } else {
        let saltRounds = 10;
        let hashed = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            first_name: first,
            last_name: last,
            email: email,
            password: hashed 
        });

        try{
            const savedUser = newUser.save()
            res.send(newUser);
        } catch(err) {
            res.send(err);
        }
    }
});

router.post('/login', async(req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    console.log(email);

    const user = await User.findOne({ email: email });
    if (!user) {
        res.json({"ERROR":"User does not exist."});
    } else {
        let verifiedPassword = await bcrypt.compare(password, user.password); 
        if (!verifiedPassword) {
            res.json({"ERROR":"Email or password is incorrect."});
        } else {
            res.send("SUCCESS");
        }
    }

});

module.exports = router;