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
    text_channels: [{
        type: String
    }],
    voice_channels: [{
        type: String
    }],
    picture: {
        type: String
    },
    admins: [{
        type: String
    }],
    created_by: {
        type:String,
    }
});

module.exports = mongoose.model("Server", ServerSchema);
