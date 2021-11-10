export class ServiceError extends Error {
    constructor(public message: string, public isClientDataIncorrect: boolean) {
        super(message);
    }
};