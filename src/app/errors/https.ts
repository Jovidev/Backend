export class ServerError extends Error {
    public errorDetails?: unknown;
    constructor(error: Error | string) {
        super('BACKEND_ERRORS.SERVER_ERROR');
        this.name = 'ServerError';
        if (error instanceof Error) {
            this.stack = error.stack;
        }
        this.errorDetails = error;
    }
}