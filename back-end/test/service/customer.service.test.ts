import customerService from '../../service/customer.service';
import addressDB from '../../repository/address.db';
import customerDb from '../../repository/customer.db';
import { AuthenticationRequest, CustomerInput, AddressInput } from '../../types';
import { Address } from '../../model/Address';
import { Customer } from '../../model/Customer';

const mockAddressInput: AddressInput = {
    address_id: 1,
    housecode: '123A',
    street: 'Main St',
    postalcode: '12345',
};

const mockAddress = new Address(mockAddressInput);

const mockCustomerInput: CustomerInput = {
    name: 'John Doe',
    password: 'password123',
    email: 'john.doe@example.com',
    number: '1234567890',
    address: mockAddress,
};

const mockCustomer = new Customer({
    ...mockCustomerInput,
    id: 1,
    address: mockAddress,
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

    // Mock bcrypt.compare to simulate successful password comparison
    jest.mock('bcryptjs', () => ({
        compare: jest.fn().mockImplementation((data: string, encrypted: string) => {
            return Promise.resolve(true); // Simulate a successful password comparison
        }),
    }));
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Customer Service - Login Tests', () => {
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
