import {Controller,UserCreateController} from "@/app/controller"
import {makeUserCreateUseCase} from "@/factories/domain/use-cases"

export const makeUserCreateController = (): Controller => {
    return new UserCreateController(makeUserCreateUseCase());
};