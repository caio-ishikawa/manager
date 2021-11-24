const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    message: {
        type: String, 
    },
    user: {
        type: String, 
        required: true
    },
    picture: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    file_key: {
        type: String,
    },
    server: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Chat", ChatSchema);