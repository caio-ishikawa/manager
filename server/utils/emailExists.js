const User = require('../models/User');

// Queries DB and returns true if email is already registered //
const emailExists = async(email) => {
    const user = await User.findOne({ email: email});

    if (user) {
        return true;
    } else {
        return false;
    }
};

exports.emailExists = emailExists; 