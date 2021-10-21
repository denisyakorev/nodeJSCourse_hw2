import {Response} from "express";
import {addUser, deleteUser, getAutoSuggestUsers, getUser, homepage, updateUser} from "./views";

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', homepage);

app.delete('/user/:id', deleteUser);

app.get('/user/:id', getUser);

app.put('/user/:id', updateUser);

app.get('/user', getAutoSuggestUsers);

app.post('/user', addUser);



app.listen(port, () => console.log(`Server started on port ${port}`));