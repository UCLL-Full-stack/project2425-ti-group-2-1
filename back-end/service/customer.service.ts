import { findCustomerByEmail } from '../repository/customer.db';
import { AuthenticationRequest, AuthenticationResponse } from '../types/index';

export const login = (authRequest: AuthenticationRequest): AuthenticationResponse => {
    const { email, password } = authRequest;

    const customer = findCustomerByEmail(email);

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