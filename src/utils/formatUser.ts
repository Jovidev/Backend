import { User } from '@/domain/entities';

type UserDTO = {
    id: number;
    name: string;
    email: string;
    age: number;
};


export const formatUsers = (users) => {
    return users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            age: user.age
        }
    });
}