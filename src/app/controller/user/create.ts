import { Request, Response, badRequest, ok,dataAlreadyExists } from "@/app/helpers";
import { Controller } from "@/app/controller/controller";
import { UserCreateUseCase } from "@/domain/use-cases";
import { ValidationBuilder, Validator } from "@/app/validation";
import { BadRequestError, DataAlreadyExistsError } from "@/domain/entities/errors";

interface HttpRequest {
  name: string;
  email: string;
  password: string;
  age: number;
  cpf: string;
}

type Model = Error | string;

export class UserCreateController extends Controller {
  constructor(private readonly userCreateUseCase: UserCreateUseCase) {
    super();
  }

  async perform({ body }: Request<HttpRequest>): Promise<Response<Model>> {
    try {
      const email = await this.userCreateUseCase({ ...body });
      return ok(email);
    } catch (error) {
      if (error instanceof BadRequestError) return badRequest(error);
      if (error instanceof DataAlreadyExistsError) return dataAlreadyExists(error)
      throw error;
    }
  }

  buildValidators({name,email,password,age,cpf,}: HttpRequest): Validator[] {
    return [
        ...ValidationBuilder.of({ value: name, fieldName: 'name' }).required().build(),
        ...ValidationBuilder.of({ value: email, fieldName: 'email' }).required().email().build(),
        ...ValidationBuilder.of({ value: password, fieldName: 'password' }).required().build(),
        ...ValidationBuilder.of({ value: age, fieldName: 'age' }).required().build(),
        ...ValidationBuilder.of({ value: cpf, fieldName: 'cpf' }).required().cpf().build(),
    ];  
  }
}
