const express = require('express');
const cors = require('cors');

require('./mongoose')

const app =  express();

app.use(express.json());
app.use(cors());

const menuItemRouter = require('./routes/menuItem');
app.use('/menuItem', menuItemRouter);

module.exports = app;