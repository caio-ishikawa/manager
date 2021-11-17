const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    server: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    uploaded_by: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("File", FileSchema);