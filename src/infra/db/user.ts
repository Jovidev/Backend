
import { PrismaRepository } from '@/infra/db';
import { response } from 'express';
import {User} from "@prisma/client"
import bcrypt from 'bcrypt'
import { BadRequestError } from '@/domain/entities';


export class PrismaUserRepository {
    constructor(private readonly prisma: typeof PrismaRepository) { }
    
    async getByEmail(email) {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        });
        
        return user;
    }
    
    async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<Error | string> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        try{
        const newUser = await this.prisma.user.create({
            data: {
                ...user,
                password: hashedPassword,
            }
            
        });
        return newUser.email;
        } catch(err){
            throw new BadRequestError(err)
        }
        
    }
    async findByDocument(cpf: string): Promise<boolean> {
        const user = await this.prisma.user.findUnique({
            where: {
                cpf
            }
        });
        return !!user;
    }
}
