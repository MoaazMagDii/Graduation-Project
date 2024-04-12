const express = require("express");

const app = express();
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');

// 1) GLOBAL MIDDLEWARES
app.use(express.json());



// 3) ROUTES
app.use("/NestInvest/users", userRouter);
app.use("/NestInvest/admins", adminRouter);




module.exports = app;
