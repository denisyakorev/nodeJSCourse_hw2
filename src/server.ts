import {NextFunction, Response, Request} from "express";
import { userRouter, groupRouter } from "./routers";


const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/user', userRouter);
app.use('/group', groupRouter);

app.use(function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err.stack)
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
});

app.listen(port, () => console.log(`Server started on port ${port}`));