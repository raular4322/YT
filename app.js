const bodyParser = require('body-parser');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const chestRoutes = require('./routes/chestRoutes');
const cardRoutes = require('./routes/cardRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/chest', chestRoutes);
app.use('/card', cardRoutes);

module.exports = app;
