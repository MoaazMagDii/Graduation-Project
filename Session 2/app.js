const express = require("express");

const app = express();

const testRouter = require('./routes/testRout');


app.use('/NestInvest', testRouter);



module.exports = app;
