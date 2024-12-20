import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createProduct = async () => {
    try {
        // Create products
        const product1 = await prisma.product.create({
            data: {
                name: 'Bluetooth Headphones',
                description: 'High-quality wireless Bluetooth headphones with noise cancellation.',
                price: 99.99,
                category: 'electronics',
                image: 'https://praktijkdewaterlely.nl/wp-content/uploads/2020/02/Alcohol-scaled.jpg',
                stock: 150,
            },
        });

        const product2 = await prisma.product.create({
            data: {
                name: 'Vodka',
                description: 'Premium vodka with a smooth taste.',
                price: 39.99,
                category: 'alcohol',
                image: 'https://praktijkdewaterlely.nl/wp-content/uploads/2020/02/Alcohol-scaled.jpg',
                stock: 150,
            },
        });

        console.log('Products created:', product1, product2);

        // Return created products to use in the main function
        return [product1, product2];
    } catch (error) {
        console.error('Error creating products:', error);
    }
};

const createCustomers = async () => {
    try {
        // Create customers and associate them with products
        const customer1 = await prisma.customer.create({
            data: {
                name: 'john',
                email: 'john.doe@gmail.com',
                password: bcrypt.hashSync('password', 10),
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
                password: bcrypt.hashSync('password123', 10),
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
                password: bcrypt.hashSync('securepassword', 10),
                number: '+32 0476 99 00 11',
                role: 'banned',
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
                email: 'admin@example.com',  // Ensure this is a unique email
                password: bcrypt.hashSync('adminpassword', 10),
                number: '+32 0476 00 22 33',
                role: 'admin',  // Assigning the role 'admin'
                address: {
                    create: {
                        housecode: '1A',
                        street: 'adminstreet',
                        postalcode: '2528',
                    },
                },
            },
        });

        console.log(
            'Customers created and associated with products:',
            customer1,
            customer2,
            customer3,
            admin
        );
    } catch (error) {
        console.error('Error creating customers:', error);
    }
};

async function main() {
    try {
        // Delete all existing order products first (to avoid foreign key violations)
        await prisma.orderProduct.deleteMany();
        console.log('All order products deleted.');

        // Then delete all orders
        await prisma.order.deleteMany();
        console.log('All orders deleted.');

        // Then delete all customers
        await prisma.customer.deleteMany();
        console.log('All customers deleted.');

        // Then delete all addresses
        await prisma.address.deleteMany();
        console.log('All addresses deleted.');

        // Then delete products
        await prisma.product.deleteMany();
        console.log('All products deleted.');

        // Create products
        const products = await createProduct();

        // Create customers
        await createCustomers();
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
