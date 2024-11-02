import { Customer } from "../model/Customer"

const customers: Customer[] = [];

const createCustomer = (customer: Customer): Customer => {
    customers.push(customer);
    return customer;
};