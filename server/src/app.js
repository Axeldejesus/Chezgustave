const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());


app.use(express.json());
app.use('/src/uploads', express.static('src/uploads'));
app.get('/', (req, res) => {
    res.send('Hello world');
});


app.use('/', require('./routes/Routes'));

module.exports = app;