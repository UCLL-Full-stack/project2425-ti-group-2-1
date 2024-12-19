import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createProduct = async () => {
    try {
        const product = await prisma.product.create({
            data: {
                name: 'Wireless Bluetooth Headphones',
                description: 'High-quality wireless Bluetooth headphones with noise cancellation.',
                price: 99.99,
                category: 'Electronics',
                image: 'https://praktijkdewaterlely.nl/wp-content/uploads/2020/02/Alcohol-scaled.jpg',
                stock: 150,
            },
        });
        console.log('Product created:', product);
    } catch (error) {
        console.error('Error creating product:', error);
    } finally {
        await prisma.$disconnect();
    }
};

async function main() {
    // Hash passwords before storing
    const hashPassword = (password: string) => bcrypt.hashSync(password, 10);

    await prisma.customer.deleteMany();
    await prisma.address.deleteMany();

    // Create customers with hashed passwords and unique emails
    const customer1 = await prisma.customer.create({
        data: {
            name: 'john',
            email: 'john.doe@gmail.com',
            password: hashPassword('password'),
            number: '+32 0476 55 44 44',
            address: {
                create: {
                    housecode: '32D',
                    street: 'shpekkystreet',
                    postalcode: '2525',
                },
            },
        },
    });

    const customer2 = await prisma.customer.create({
        data: {
            name: 'alice',
            email: 'alice.smith@gmail.com',
            password: hashPassword('password123'),
            number: '+32 0476 77 88 99',
            address: {
                create: {
                    housecode: '12B',
                    street: 'queenstreet',
                    postalcode: '2526',
                },
            },
        },
    });

    const customer3 = await prisma.customer.create({
        data: {
            name: 'bob',
            email: 'bob.johnson@gmail.com',
            password: hashPassword('securepassword'),
            number: '+32 0476 99 00 11',
            address: {
                create: {
                    housecode: '45A',
                    street: 'kingstreet',
                    postalcode: '2527',
                },
            },
        },
    });

    const admin = await prisma.customer.create({
        data: {
            name: 'admin',
            email: 'admin@admin.com',
            password: hashPassword('adminpassword'),
            number: '+32 0476 00 22 33',
            address: {
                create: {
                    housecode: '1A',
                    street: 'adminstreet',
                    postalcode: '2528',
                },
            },
        },
    });

    console.log('customers created:', { customer1, customer2, customer3, admin });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

createProduct();
