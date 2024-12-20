import database from './database';
import { Customer } from '../model/Customer';

const createCustomer = async (customer: Customer): Promise<Customer> => {
    try {
        const customerPrisma = await database.customer.create({
            data: {
                name: customer.name,
                email: customer.email,
                password: customer.password,
                number: customer.number,
                role: customer.role,
                address: {
                    connect: { id: customer.address?.getAddressID() },
                },
            },
            include: {
                address: true,
            },
        });

        return Customer.from(customerPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};



const getCustomerById = async ({ id }: { id: number }): Promise<Customer | null> => {
    try {
        const customerPrisma = await database.customer.findUnique({
            where: { id },
            include: {
                address: true,
            },
        });

        return customerPrisma ? Customer.from(customerPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getCustomerByEmail = async (email: string): Promise<Customer | null> => {
    try {
        const customerPrisma = await database.customer.findUnique({
            where: { email },
            include: {
                address: true,
            },
        });

        return customerPrisma ? Customer.from(customerPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllCustomers = async (): Promise<Customer[]> => {
    try {
        const customerPrisma = await database.customer.findMany({
            include: {
                address: true,
            },
        });

        return customerPrisma.map((customerPrisma) =>
            Customer.from(customerPrisma)
        );
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createCustomer,
    getCustomerById,
    getCustomerByEmail,
    getAllCustomers,
};
