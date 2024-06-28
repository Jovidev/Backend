import { badRequest, Request, Response, serverError } from '@/app/helpers';
import { ValidationComposite, Validator } from '@/app/validation';

export abstract class Controller<T = unknown> {
    abstract perform(request: Request<T>): Promise<Response>

    buildValidators(httpRequest: T): Validator[] {
        return [];
    }

    async handle(httpRequestBody: T): Promise<Response> {
        const error = this.validate(httpRequestBody);
        if (error !== undefined) return badRequest(error);
        try {
            return await this.perform({ body: httpRequestBody });
        } catch (error) {
            return serverError(error);
        }
    }

    private validate(httpRequest: T): Error | undefined {
        const validators = this.buildValidators(httpRequest);
        return new ValidationComposite(validators).validate();
    }
}