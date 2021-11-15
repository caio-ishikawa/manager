const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true,
        min: 8
    },
    servers: [{
        type: String,
        required: false
    }]
});

module.exports = mongoose.model("User", UserSchema);