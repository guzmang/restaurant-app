'use strict'

const express = require('express');
const app = express();

// Loading routes files
const restaurants_routes = require('./routes/restaurant');

// Routes
app.use('/api', restaurants_routes);

// Exports
module.exports = app;