"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controllers_1 = require("./controllers");
var express = require('express');
var app = express();
var port = 3000;
app.use(express.json());
app.get('/', controllers_1.homepage);
app.delete('/user/:id', controllers_1.deleteUser);
app.get('/user/:id', controllers_1.getUser);
app.put('/user/:id', controllers_1.updateUser);
app.get('/user', controllers_1.getAutoSuggestUsers);
app.post('/user', controllers_1.addUser);
app.use(function errorHandler(err, req, res, next) {
    console.log(err.stack);
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
});
app.listen(port, function () { return console.log("Server started on port " + port); });
