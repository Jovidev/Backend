import {PrismaUserRepository} from "@/infra/db"
import {DataAlreadyExistsError} from "@/domain/entities"
export type UserCreateUseCase = (param: {
    email: string,
    name:string,
    password: string,
    age: number,
    cpf: string,
}) => Promise<string | Error>;

type Setup = (userRepository: PrismaUserRepository) => UserCreateUseCase;

export const setupUserCreateUseCase: Setup = (userRepository) => async (params) => {
    const {age,cpf,email,name,password} = params 

        const userAlReadyExists = await userRepository.getByEmail(email)
        if (userAlReadyExists) {
            throw new DataAlreadyExistsError('Email already exists')
        }

        const cpfAlreadyExists = await userRepository.findByDocument(cpf)
        if (cpfAlreadyExists) {
            throw new DataAlreadyExistsError('CPF already exists')
        }

        const user = await userRepository.create({
            age,
            cpf,
            email,
            name,
            password,
        })
        
        return user
};