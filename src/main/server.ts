import app from '@/main/config/app';
import { PrismaRepository } from '@/infra/db'

async function main() {

    try {
        await PrismaRepository.$connect();
        console.log('Connected to the database.');
        app.listen(3333, () => {
            console.log(`Server is running on port http://localhost:${3333}`);
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

main()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await PrismaRepository.$disconnect();
    });