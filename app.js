const express = require('express'); //importing the express
const morgan = require('morgan');
const invoiceRouter = require('./routes/invoiceRoutes');

const app = express();

//Middlewares

app.use(express.json());

app.use('/api/v1/tours', invoiceRouter);

module.exports = app;
