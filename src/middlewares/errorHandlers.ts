import {NextFunction, Request, Response} from "express";
import winston, {format} from 'winston';
import {ServiceError} from "../services";

export const logger = winston.createLogger({
    level: 'error',
    transports: [
        new winston.transports.Console(),
    ],
    format: format.combine(
        format.timestamp(),
        format.prettyPrint()
    ),
})

export const errorHandlers = (err: Error | ServiceError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err)
    }

    logger.error(err);

    if((err as ServiceError).isClientDataIncorrect) {
        res.status(400).send(err.message)
    } else {
        res.status(500).send('Something broke!');
    }
    res.end();
}

export const methodErrorHandler = (req: Request, res: Response, error: Error) => {
    logger.error(`
    req: 
        url: ${req.url},
        params: ${JSON.stringify(req.params)},
        query: ${JSON.stringify(req.query)},
    
    res: 
        headersSent: ${res.headersSent}
        
    error:
        message: ${error.message},
        stack: ${error.stack}
    `);
}
