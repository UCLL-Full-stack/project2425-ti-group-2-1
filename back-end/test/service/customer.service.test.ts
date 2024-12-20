import customerService from '../../service/customer.service';
import addressDB from '../../repository/address.db';
import customerDb from '../../repository/customer.db';
import { AuthenticationRequest, CustomerInput, AddressInput } from '../../types';
import { Address } from '../../model/Address';
import { Customer } from '../../model/Customer';
import bcrypt from 'bcrypt';

const password = 'password123';
const hashedPassword = bcrypt.hashSync(password, 10);

const mockAddressInput: AddressInput = {
    address_id: 1,
    housecode: '123A',
    street: 'Main St',
    postalcode: '12345',
};

const mockAddress = new Address({
    id: mockAddressInput.address_id,
    housecode: mockAddressInput.housecode,
    street: mockAddressInput.street,
    postalcode: mockAddressInput.postalcode,
});

// Ensure that 'mockCustomerInput' is passing the Address object
const mockCustomerInput: CustomerInput = {
    name: 'John Doe',
    password: hashedPassword,
    email: 'john.doe@example.com',
    number: '1234567890',
    address: mockAddress, // Ensure the address is correctly passed
    role: 'klant', // Role is explicitly passed, or defaults to 'klant'
};

const mockCustomer = new Customer({
    id: 1,
    name: mockCustomerInput.name,
    password: mockCustomerInput.password,
    email: mockCustomerInput.email,
    number: mockCustomerInput.number,
    address: mockAddress,
    role: mockCustomerInput.role!, // role is now guaranteed to be 'klant' if not specified
});

let mockGetCustomerByEmail: jest.Mock;
let mockGetCustomerById: jest.Mock;
let mockGetAddressByDetails: jest.Mock;
let mockCreateCustomer: jest.Mock;

beforeEach(() => {
    // Mock database functions
    mockGetCustomerByEmail = jest.fn();
    customerDb.getCustomerByEmail = mockGetCustomerByEmail;

    mockGetCustomerById = jest.fn();
    customerDb.getCustomerById = mockGetCustomerById;

    mockGetAddressByDetails = jest.fn();
    addressDB.getAddressByDetails = mockGetAddressByDetails;

    mockCreateCustomer = jest.fn();
    customerDb.createCustomer = mockCreateCustomer;
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Customer Service - Login Tests', () => {
    test('Given: valid credentials, when: logging in, then: should return an authentication token', async () => {
        mockGetCustomerByEmail.mockResolvedValue(mockCustomer); // Mock database response for existing customer

        const authRequest = {
            email: 'john.doe@example.com',
            password: 'password123',
        };

        // Simulate bcrypt.compare callback
        const isPasswordValid = await bcrypt.compare(authRequest.password, mockCustomer.password);

        const result = await customerService.login(authRequest);

        expect(customerDb.getCustomerByEmail).toHaveBeenCalledWith(authRequest.email);
        expect(isPasswordValid === true);
        expect(result).toEqual({
            token: expect.any(String), // Check if a token is returned
            email: mockCustomer.email,
            name: mockCustomer.name,
            role: mockCustomer.role, // Ensure role is part of the response
        });
    });

    test('Given: invalid credentials, when: logging in, then: throw "Email or password incorrect"', async () => {
        mockGetCustomerByEmail.mockResolvedValue(mockCustomer);

        const authRequest: AuthenticationRequest = {
            email: 'john.doe@example.com',
            password: 'wrongpassword',
        };

        await expect(customerService.login(authRequest)).rejects.toThrow(
            'Email or password incorrect'
        );
    });

    test('Given: email does not exist, when: logging in, then: throw "Email or password incorrect"', async () => {
        mockGetCustomerByEmail.mockResolvedValue(null);

        const authRequest: AuthenticationRequest = {
            email: 'invalid@example.com',
            password: 'password123',
        };

        await expect(customerService.login(authRequest)).rejects.toThrow(
            'Email or password incorrect'
        );
    });
});

describe('Customer Service - Create Customer Tests', () => {
    test('Given: valid input, when: creating a customer, then: customer is created', async () => {
        mockGetAddressByDetails.mockResolvedValue(mockAddress);
        mockGetCustomerByEmail.mockResolvedValue(null);
        mockCreateCustomer.mockResolvedValue(mockCustomer);

        const result = await customerService.createCustomer(mockCustomerInput);

        expect(mockGetAddressByDetails).toHaveBeenCalledWith(
            mockCustomerInput.address.housecode,
            mockCustomerInput.address.street,
            mockCustomerInput.address.postalcode
        );
        expect(mockCreateCustomer).toHaveBeenCalledWith(
            expect.objectContaining({
                name: mockCustomerInput.name,
                email: mockCustomerInput.email,
                number: mockCustomerInput.number,
                address: mockAddress,
                role: mockCustomerInput.role, // Ensure role is passed correctly
            })
        );
        expect(result).toEqual(mockCustomer);
    });

    test('Given: incomplete customer input, when: creating a customer, then: throw error', async () => {
        const incompleteCustomerInput = { ...mockCustomerInput, email: '' };

        await expect(customerService.createCustomer(incompleteCustomerInput)).rejects.toThrow(
            'Name, password, email, and number are required.'
        );
    });
});
