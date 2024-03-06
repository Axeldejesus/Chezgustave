const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/src/uploads', express.static('src/uploads'));
app.get('/', (req, res) => {
    res.send('Hello world');
});

// Register the logements router
app.use('/', require('./routes/Routes'));

module.exports = app;