import { Customer } from "../../model/Customer";
import { Address } from "../../model/Address";
import customerService from "../../service/customer.service";
import addressDB from '../../repository/address.db';
import customerDb from "../../repository/customer.db";
import { AuthenticationRequest, CustomerInput, AddressInput } from '../../types';

const mockAddressInput: AddressInput = {
    address_id: 1,
    housecode: "123A",
    street: "Main St",
    postalcode: "12345",
};

const mockAddress = new Address(mockAddressInput);

const mockCustomerInput: CustomerInput = {
    name: "John Doe",
    password: "password123",
    email: "john.doe@example.com",
    number: "1234567890",
    address: mockAddress,
};

const mockCustomer = new Customer({
    ...mockCustomerInput,
    customer_id: 1,
    address: mockAddress,
});

let mockGetCustomerByEmail: jest.Mock;
let mockGetCustomerById: jest.Mock;
let mockGetAddressById: jest.Mock;
let mockCreateCustomer: jest.Mock;

beforeEach(() => {
    mockGetCustomerByEmail = jest.fn();
    customerDb.getCustomerByEmail = mockGetCustomerByEmail;

    mockGetCustomerById = jest.fn();
    customerDb.getCustomerById = mockGetCustomerById;

    mockGetAddressById = jest.fn().mockReturnValue(mockAddress);
    addressDB.getAddressById = mockGetAddressById;

    mockCreateCustomer = jest.fn();
    customerDb.createCustomer = mockCreateCustomer;
});

afterEach(() => {
    jest.clearAllMocks();
});

test("given valid credentials, when login is called, then it returns the customer ID and email", () => {
    mockGetCustomerByEmail.mockReturnValue(mockCustomer);

    const authRequest: AuthenticationRequest = {
        email: "john.doe@example.com",
        password: "password123",
    };

    const response = customerService.login(authRequest);

    expect(mockGetCustomerByEmail).toHaveBeenCalledWith(authRequest.email);
    expect(response).toEqual({
        id: mockCustomer.customer_id,
        email: mockCustomer.email,
    });
});

test("given an invalid email, when login is called, then it throws an error", () => {
    mockGetCustomerByEmail.mockReturnValue(null);

    const authRequest: AuthenticationRequest = {
        email: "invalid@example.com",
        password: "password123",
    };

    expect(() => customerService.login(authRequest)).toThrow("Email or password incorrect");
});

test("given a wrong password, when login is called, then it throws an error", () => {
    mockGetCustomerByEmail.mockReturnValue(mockCustomer);

    const authRequest: AuthenticationRequest = {
        email: "john.doe@example.com",
        password: "wrongpassword",
    };

    expect(() => customerService.login(authRequest)).toThrow("Email or password incorrect");
});

test("given valid customer input, when createCustomer is called, then it creates and returns the customer", () => {
    mockGetAddressById.mockReturnValue(mockAddressInput);
    mockGetCustomerById.mockReturnValue(null);
    mockCreateCustomer.mockReturnValue(mockCustomer);

    const result = customerService.createCustomer(mockCustomerInput);

    expect(mockGetAddressById).toHaveBeenCalledWith({ id: mockCustomerInput.address.address_id });
    expect(mockCreateCustomer).toHaveBeenCalledWith(expect.objectContaining({
        name: mockCustomerInput.name,
        password: mockCustomerInput.password,
        email: mockCustomerInput.email,
        number: mockCustomerInput.number,
        address: mockAddressInput,
    }));
    expect(result).toEqual(mockCustomer);
});

test("given incomplete customer input, when createCustomer is called, then it throws an error", () => {
    const incompleteCustomerInput = {
        ...mockCustomerInput,
        email: "",
    };

    expect(() => customerService.createCustomer(incompleteCustomerInput as CustomerInput)).toThrow("All fields are required.");
});

test("given an invalid address, when createCustomer is called, then it throws an error", () => {
    mockGetAddressById.mockReturnValue(null);

    expect(() => customerService.createCustomer(mockCustomerInput)).toThrow("address field is required");
});

test("given an existing customer ID, when createCustomer is called, then it throws an error", () => {
    mockGetAddressById.mockReturnValue(mockAddressInput);
    mockGetCustomerById.mockReturnValue(mockCustomer);

    expect(() => customerService.createCustomer(mockCustomerInput)).toThrow("A customer with this ID already exists.");
});
