import { AuthenticationRequest, AuthenticationResponse, CustomerInput, Role } from '../types/index';
import { Customer } from '../model/Customer';
import addressDB from '../repository/address.db';
import customerDb from '../repository/customer.db';
import bcrypt from 'bcrypt';
import { Address } from '../model/Address';
import { generateJWTToken } from '../util/jwt';

const isEmailTaken = async (email: string): Promise<boolean> => {
    const existingCustomer = await customerDb.getCustomerByEmail(email);
    return !!existingCustomer;
};

export const login = async (
    authRequest: AuthenticationRequest
): Promise<AuthenticationResponse> => {
    const { email, password } = authRequest;

    const customer = await customerDb.getCustomerByEmail(email);

    console.log(customer);
    if (!customer) {
        throw new Error('Email or password incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
        throw new Error('Email or password incorrect');
    }

    const token = generateJWTToken({
        email: customer.email,
        name: customer.name,
    });

    return {
        token,
        email: customer.email,
        name: customer.name,
        role: customer.role,
    };
};

const createCustomer = async (input: CustomerInput): Promise<Customer> => {
    const { name, password, email, number, address: addressInput } = input;

    if (!name || !password || !email || !number) {
        throw new Error('Name, password, email, and number are required.');
    }

    if (await isEmailTaken(email)) {
        throw new Error('A customer with this email already exists.');
    }

    if (!addressInput.housecode || !addressInput.street || !addressInput.postalcode) {
        throw new Error('Incomplete address information provided.');
    }

    const existingAddress = await addressDB.getAddressByDetails(
        addressInput.housecode,
        addressInput.street,
        addressInput.postalcode
    );

    let address;
    if (existingAddress) {
        address = existingAddress;
    } else {
        address = new Address({
            housecode: addressInput.housecode,
            street: addressInput.street,
            postalcode: addressInput.postalcode,
        });

        address = await addressDB.createAddress(address);
    }

    const existingCustomer = await customerDb.getCustomerByEmail(email);
    if (existingCustomer) {
        throw new Error('A customer with this email already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role: Role = 'klant';

    const newCustomer = new Customer({
        name,
        email,
        password: hashedPassword,
        number,
        address,
        role,
    });

    const createdCustomer = await customerDb.createCustomer(newCustomer);

    return createdCustomer;
};

export default { createCustomer, login };
