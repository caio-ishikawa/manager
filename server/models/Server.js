const mongoose = require('mongoose');

const ServerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 8
    },
    members: [{
        type: String,
        required: false
    }],
    picture: {
        type: String
    },
    admins: [{
        type: String
    }],
    created_by: {
        type:String,
    },
    updates: [{
        type: String
    }],
    channels: [{
        type: String,
    }]
});

module.exports = mongoose.model("Server", ServerSchema);
