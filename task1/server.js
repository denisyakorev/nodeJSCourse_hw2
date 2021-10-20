"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views_1 = require("./views");
var express = require('express');
var app = express();
var port = 3000;
app.get('/', views_1.homepage);
app.get('/user/:id', views_1.getUser);
app.listen(port, function () { return console.log("Server started on port " + port); });
