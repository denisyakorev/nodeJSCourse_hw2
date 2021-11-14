"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routers_1 = require("./routers");
var express = require('express');
var app = express();
var port = 3000;
app.use(express.json());
app.use('/user', routers_1.userRouter);
app.use('/group', routers_1.groupRouter);
app.use(function errorHandler(err, req, res, next) {
    console.log(err.stack);
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
});
app.listen(port, function () { return console.log("Server started on port " + port); });
