import { AuthenticationRequest, AuthenticationResponse, CustomerInput } from '../types/index';
import { Customer } from "../model/Customer"
import addressDB from '../repository/address.db';
import customerDb from "../repository/customer.db";

export const login = (authRequest: AuthenticationRequest): AuthenticationResponse => {
    const { email, password } = authRequest;

    const customer = customerDb.getCustomerByEmail(email);

    if (!customer) {
        throw new Error("Email or password incorrect");
    }

    if (customer.password !== password) {
        throw new Error("Email or password incorrect");
    }

    return {
        id: customer.customer_id as number,
        email: customer.email,
    };
};

const createCustomer = ({
    name,
    password,
    email,
    number,
    address: addressInput,
}: CustomerInput): Customer => {
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

export default { createCustomer, login };