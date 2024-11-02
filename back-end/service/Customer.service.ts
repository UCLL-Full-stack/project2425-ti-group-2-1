import { Customer } from "../model/Customer"
import addressDB from '../repository/Address.db';
import customerDb from "../repository/Customer.db";
import { CustomerInput } from "../types";

const createCustomer = ({
    name,
    password,
    email,
    number,
    address: addressInput,
}: CustomerInput): Customer => {
    if(!addressInput.address_id) throw new Error("address needs to have an id.");
    if(!name || !password || !email || !number) {
        throw new Error("All fields are required.");
    };

    const address = addressDB.getAddressById({id: addressInput.address_id as number});

    if (!address) throw new Error("address field is required");

    const customer = new Customer({name, password, email, number, address});

    const customerId = customer.customer_id as number;

    const existingCustomer = customerDb.getCustomerById({id: customerId});
    if (existingCustomer) {
        throw new Error("A customer with this ID already exists.");
    }

    return customerDb.createCustomer(customer);
};

export default { createCustomer };