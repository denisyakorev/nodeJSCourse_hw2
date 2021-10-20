import {Response} from "express";
import {addUser, getAutoSuggestUsers, getUser, homepage} from "./views";

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', homepage);

app.get('/user/:id', getUser);

app.get('/user', getAutoSuggestUsers);

app.post('/user', addUser);

app.listen(port, () => console.log(`Server started on port ${port}`));