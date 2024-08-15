const express = require('express');
const app = express();
const router = require('./routes');
require('dotenv').config();
const cors = require('cors');

var corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use((err, req, res, next) => {
  console.log(err); //check error here gaes
    let errorStatus = err.statusCode || 404;
    res.status (errorStatus).json({message: err.message, errorCode : err.errorCode || 1})
})

module.exports = app;
