const User = require('../models/User');

// Queries DB for username and returns true if user exists //
const usernameExists = async(username) => {
    const user = await User.findOne({ username: username });

    if (user) {
        return true;
    } else {
        return false;
    }
};

exports.usernameExists = usernameExists;