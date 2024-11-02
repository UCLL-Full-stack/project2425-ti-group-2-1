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
    customers.push(customer);
    return customer;
};

export const findCustomerByEmail = (email: string): Customer | null => {
    return customers.find((customer) => customer.email === email) || null;
};



