import { Address } from "../model/Address";
import { Customer } from "../model/Customer";

const addressYannick = new Address({
    housecode : `25D`,
    street : `Cornerstreet`,
    postalcode : `2221`
})

const customers : Customer[] = [
    new Customer({
        customer_id: 1,
        name : `Yannick`,
        password : `password`,
        email : `yannick@gmail.com`,
        number : `04323232`,
        address : addressYannick
    })
];

const createCustomer = (customer: Customer): Customer => {
    if (customers.includes(customer)) {
        throw new Error('customer already exists');
    }
    customers.push(customer);
    return customer;
};

const getCustomerById = ({ id }: { id: number }): Customer | null => {
    try {
        return customers.find((customer) => customer.getCustomerID() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getCustomerByEmail = (email: string): Customer | undefined => {
    return customers.find(customer => customer.email === email);
};

const getCustomerByPhone = (number: string): Customer | undefined => {
    return customers.find(customer => customer.number === number);
};

export default {
    createCustomer,
    getCustomerById,
    getCustomerByEmail,
    getCustomerByPhone,
};


