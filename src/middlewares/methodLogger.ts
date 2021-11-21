import {NextFunction, Request, Response} from "express";
const url = require('url');

export const methodLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log('\x1b[32m', `${req.method}:` ,'\x1b[0m');
    console.log('\x1b[34m', `params: ${JSON.stringify(url.parse(req.url, true))}` ,'\x1b[0m');
    console.log('\x1b[36m', `body: ${JSON.stringify(req.body)}` ,'\x1b[0m');
    next();
}