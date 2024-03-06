const express = require('express');
const app = express();
require('dotenv').config();

// IMPORTATION DU MODÈLE USERS
require('./models/users');

// Define global middlewares here:
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world');
});

// Register all routers
app.use('/', require('./routes/Routes'));

module.exports = app;