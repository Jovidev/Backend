import { ServerError } from '@/app/errors';

type FunctionsErrorCode =
    | 'ok'
    | 'unknown'
    | 'invalid-argument'
    | 'not-found'
    | 'already-exists'
    | 'aborted'
    | 'out-of-range'
    | 'internal'
    | 'unavailable'

export interface Response<T = any> {
    statusCode: FunctionsErrorCode
    result: T
}

export interface Request<T = any> {
    body: T

}

export const ok = <T = any>(result: T): Response<T> => ({
    statusCode: 'ok',
    result
});

export const badRequest = (error: Error): Response<Error> => ({
    statusCode: 'invalid-argument',
    result: error
});

export const notFound = (error: any): Response<Error> => ({
    statusCode: 'not-found',
    result: error
});

export const serverError = (error: any): Response<Error> => ({
    statusCode: 'internal',
    result: new ServerError(error instanceof Error ? error : JSON.stringify(error))
});

export const dataAlreadyExists = (error: any): Response<Error> =>({
    statusCode:'already-exists',
    result: error
})