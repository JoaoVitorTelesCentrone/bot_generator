import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({
        where: { email: 'admin@example.com' },
    });

    if (!existingUser) {
        // Cria o usuário inicial
        const hashedPassword = await bcrypt.hash('admin123', 10); // Senha padrão

        await prisma.user.create({
            data: {
                email: 'admin@example.com',
                password: hashedPassword,
                username: 'admin', // Adicione outros campos se necessário
            },
        });

        console.log('Usuário admin criado com sucesso!');
    } else {
        console.log('Usuário admin já existe.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });