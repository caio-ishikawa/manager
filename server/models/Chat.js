const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    message: {
        type: String, 
        required: true
    },
    user: {
        type: String, 
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    server: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Chat", ChatSchema);