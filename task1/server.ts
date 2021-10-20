import {Response} from "express";
import {getUser, homepage} from "./views";

const express = require('express');
const app = express();
const port = 3000;

app.get('/', homepage);

app.get('/user/:id', getUser);

app.listen(port, () => console.log(`Server started on port ${port}`));