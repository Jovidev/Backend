import { UserCreateUseCase, setupUserCreateUseCase } from '@/domain/use-cases';
import { makePrismaPrismaUserRepository } from '@/factories/infra/repository';

export const makeUserCreateUseCase = (): UserCreateUseCase => {
    return setupUserCreateUseCase(makePrismaPrismaUserRepository());
};