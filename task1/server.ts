import {NextFunction, Response, Request} from "express";
import {addUser, deleteUser, getAutoSuggestUsers, getUser, homepage, updateUser} from "./controllers";

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

app.use(function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err.stack)
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
});



app.listen(port, () => console.log(`Server started on port ${port}`));