import { AuthenticationRequest, AuthenticationResponse, CustomerInput } from '../types/index';
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

    // Retrieve the customer by email
    const customer = await customerDb.getCustomerByEmail(email);

    console.log(customer);
    if (!customer) {
        throw new Error('Email or password incorrect');
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
        throw new Error('Email or password incorrect');
    }

    // Generate a JWT token for the customer
    const token = generateJWTToken({
        email: customer.email,
        name: customer.name,
    });

    // Return the authentication response
    return {
        token,
        email: customer.email,
        name: customer.name,
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

    // Validate address input
    if (!addressInput.housecode || !addressInput.street || !addressInput.postalcode) {
        throw new Error('Incomplete address information provided.');
    }

    // Check if the address already exists using the getAddressByDetails function
    const existingAddress = await addressDB.getAddressByDetails(
        addressInput.housecode,
        addressInput.street,
        addressInput.postalcode
    );

    let address;
    if (existingAddress) {
        // If the address exists, use the existing address
        address = existingAddress;
    } else {
        // If the address doesn't exist, create a new address
        address = new Address({
            housecode: addressInput.housecode,
            street: addressInput.street,
            postalcode: addressInput.postalcode,
        });

        // Create the address in the database
        address = await addressDB.createAddress(address);
    }

    // Check if the customer already exists
    const existingCustomer = await customerDb.getCustomerByEmail(email);
    if (existingCustomer) {
        throw new Error('A customer with this email already exists.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create an instance of the Customer class
    const newCustomer = new Customer({
        name,
        email,
        password: hashedPassword,
        number,
        address, // Use the found or newly created address
    });

    // Save the customer to the database
    const createdCustomer = await customerDb.createCustomer(newCustomer);

    return createdCustomer;
};

export default { createCustomer, login };
