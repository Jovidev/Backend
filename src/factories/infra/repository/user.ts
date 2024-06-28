import { PrismaUserRepository, PrismaRepository } from '@/infra/db';

export const makePrismaPrismaUserRepository = (): PrismaUserRepository => {
    return new PrismaUserRepository(PrismaRepository);
};