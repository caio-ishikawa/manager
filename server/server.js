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
app.use('/auth', authRoutes);

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