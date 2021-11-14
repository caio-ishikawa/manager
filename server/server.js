const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const secrets = require('./secrets');

// EXPRESS + CORS SETUP //
const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

// ROUTES //
const authRoutes = require('./routes/Auth');
const postRoutes = require('./routes/Post');
app.use('/auth', authRoutes);
app.use('/post', postRoutes);

// DATABASE CONNECTION //
mongoose.connect(secrets, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to DB.");
    }
});

// SERVER LISTEN //
app.listen(PORT, () => {
    console.log("Server running on port: " + PORT);
});