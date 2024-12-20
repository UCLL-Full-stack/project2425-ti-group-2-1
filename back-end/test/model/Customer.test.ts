import { Customer } from '../../model/Customer';
import { Address } from '../../model/Address';
import { Role } from '../../types';

describe('Customer Class', () => {
    let validAddress: Address;

    beforeEach(() => {
        validAddress = new Address({
            housecode: '1234abc',
            street: 'pinkystreet',
            postalcode: '2525',
        });
    });

    test('Given: valid values for Customer, when: creating new Customer, then: new Customer is created', () => {
        const name = 'Jhonny';
        const password = 'blabla';
        const email = 'Jhonny.bravo@gmail.com';
        const number = '+32 0417 85 59 63';
        const role: Role = 'klant';

        const customer = new Customer({
            name,
            password,
            email,
            number,
            role,
            address: validAddress,
        });

        expect(customer.name).toBe(name);
        expect(customer.password).toBe(password);
        expect(customer.email).toBe(email);
        expect(customer.number).toBe(number);
        expect(customer.address).toBe(validAddress);
    });

    test('Given: missing name, when: creating new Customer, then: throw "Name is required"', () => {
        expect(
            () =>
                new Customer({
                    name: '',
                    password: 'blabla',
                    email: 'test@gmail.com',
                    number: '+32 0417 85 59 63',
                    role: 'klant',
                    address: validAddress,
                })
        ).toThrow('Name is required');
    });

    test('Given: missing password, when: creating new Customer, then: throw "Password is required"', () => {
        expect(
            () =>
                new Customer({
                    name: 'Test',
                    password: '',
                    email: 'test@gmail.com',
                    number: '+32 0417 85 59 63',
                    role: 'klant',
                    address: validAddress,
                })
        ).toThrow('Password is required');
    });

    test('Given: missing email, when: creating new Customer, then: throw "Email is required"', () => {
        expect(
            () =>
                new Customer({
                    name: 'Test',
                    password: 'blabla',
                    email: '',
                    number: '+32 0417 85 59 63',
                    role: 'klant',
                    address: validAddress,
                })
        ).toThrow('Email is required');
    });

    test('Given: missing number, when: creating new Customer, then: throw "Number is required"', () => {
        expect(
            () =>
                new Customer({
                    name: 'Test',
                    password: 'blabla',
                    email: 'test@gmail.com',
                    number: '',
                    role: 'klant',
                    address: validAddress,
                })
        ).toThrow('Number is required');
    });

    test('Given: missing address, when: creating new Customer, then: throw "Address is required"', () => {
        expect(
            () =>
                new Customer({
                    name: 'Test',
                    password: 'blabla',
                    email: 'test@gmail.com',
                    number: '+32 0417 85 59 63',
                    role: 'klant',
                    address: undefined as unknown as Address,
                })
        ).toThrow('Address is required');
    });

    test('Given: valid Customer, when: setting new name, then: name is updated', () => {
        const customer = new Customer({
            name: 'Jhonny',
            password: 'blabla',
            email: 'test@gmail.com',
            number: '+32 0417 85 59 63',
            role: 'klant',
            address: validAddress,
        });
        customer.setName('NewName');
        expect(customer.getName()).toBe('NewName');
    });

    test('Given: valid Customer, when: setting new password, then: password is updated', () => {
        const customer = new Customer({
            name: 'Jhonny',
            password: 'blabla',
            email: 'test@gmail.com',
            number: '+32 0417 85 59 63',
            role: 'klant',
            address: validAddress,
        });
        customer.setPassword('newPassword');
        expect(customer.getPassword()).toBe('newPassword');
    });

    test('Given: valid Customer, when: setting new email, then: email is updated', () => {
        const customer = new Customer({
            name: 'Jhonny',
            password: 'blabla',
            email: 'test@gmail.com',
            number: '+32 0417 85 59 63',
            role: 'klant',
            address: validAddress,
        });
        customer.setEmail('newemail@gmail.com');
        expect(customer.getEmail()).toBe('newemail@gmail.com');
    });

    test('Given: valid Customer, when: setting new number, then: number is updated', () => {
        const customer = new Customer({
            name: 'Jhonny',
            password: 'blabla',
            email: 'test@gmail.com',
            number: '+32 0417 85 59 63',
            role: 'klant',
            address: validAddress,
        });
        customer.setNumber('+32 0417 85 59 64');
        expect(customer.getNumber()).toBe('+32 0417 85 59 64');
    });

    test('Given: valid Customer, when: setting new address, then: address is updated', () => {
        const newAddress = new Address({
            housecode: '5678xyz',
            street: 'bluestreet',
            postalcode: '2526',
        });
        const customer = new Customer({
            name: 'Jhonny',
            password: 'blabla',
            email: 'test@gmail.com',
            number: '+32 0417 85 59 63',
            role: 'klant',
            address: validAddress,
        });
        customer.setAddress(newAddress);
        expect(customer.getAddress()).toBe(newAddress);
    });

    test('Given: valid Customer, when: updating name, email, and number, then: all fields are updated correctly', () => {
        const customer = new Customer({
            name: 'Jhonny',
            password: 'blabla',
            email: 'test@gmail.com',
            number: '+32 0417 85 59 63',
            role: 'klant',
            address: validAddress,
        });

        customer.setName('NewName');
        customer.setEmail('newemail@gmail.com');
        customer.setNumber('+32 0417 85 59 64');

        expect(customer.getName()).toBe('NewName');
        expect(customer.getEmail()).toBe('newemail@gmail.com');
        expect(customer.getNumber()).toBe('+32 0417 85 59 64');
    });

    test('Given: valid Customer, when: updating password and address, then: both fields are updated correctly', () => {
        const newAddress = new Address({
            housecode: '5678xyz',
            street: 'bluestreet',
            postalcode: '1000',
        });

        const customer = new Customer({
            name: 'Jhonny',
            password: 'blabla',
            email: 'test@gmail.com',
            number: '+32 0417 85 59 63',
            role: 'klant',
            address: validAddress,
        });

        customer.setPassword('newPassword123');
        customer.setAddress(newAddress);

        expect(customer.getPassword()).toBe('newPassword123');
        expect(customer.getAddress()).toBe(newAddress);
    });

    test('Given: valid Customer, when: setting empty name, then: throw "Name is required"', () => {
        const customer = new Customer({
            name: 'Jhonny',
            password: 'blabla',
            email: 'test@gmail.com',
            number: '+32 0417 85 59 63',
            role: 'klant',
            address: validAddress,
        });
        expect(() => customer.setName('')).toThrow('Name is required');
    });

    test('Given: valid Customer, when: setting empty password, then: throw "Password is required"', () => {
        const customer = new Customer({
            name: 'Jhonny',
            password: 'blabla',
            email: 'test@gmail.com',
            number: '+32 0417 85 59 63',
            role: 'klant',
            address: validAddress,
        });
        expect(() => customer.setPassword('')).toThrow('Password is required');
    });

    test('Given: valid Customer, when: setting empty email, then: throw "Email is required"', () => {
        const customer = new Customer({
            name: 'Jhonny',
            password: 'blabla',
            email: 'test@gmail.com',
            number: '+32 0417 85 59 63',
            role: 'klant',
            address: validAddress,
        });
        expect(() => customer.setEmail('')).toThrow('Email is required');
    });

    test('Given: valid Customer, when: setting empty number, then: throw "Number is required"', () => {
        const customer = new Customer({
            name: 'Jhonny',
            password: 'blabla',
            email: 'test@gmail.com',
            number: '+32 0417 85 59 63',
            role: 'klant',
            address: validAddress,
        });
        expect(() => customer.setNumber('')).toThrow('Number is required');
    });

    test('Given: valid Customer, when: setting undefined address, then: throw "Address is required"', () => {
        const customer = new Customer({
            name: 'Jhonny',
            password: 'blabla',
            email: 'test@gmail.com',
            number: '+32 0417 85 59 63',
            role: 'klant',
            address: validAddress,
        });
        expect(() => customer.setAddress(undefined as unknown as Address)).toThrow(
            'Address is required'
        );
    });
});

describe('Customer Class - Role', () => {
    let validAddress: Address;

    beforeEach(() => {
        validAddress = new Address({
            housecode: '1234abc',
            street: 'pinkystreet',
            postalcode: '2525',
        });
    });

    // Test: Valid role 'admin'
    test('Given: valid role "admin", when: creating new Customer, then: role is set to "admin"', () => {
        const role: Role = 'admin';

        const customer = new Customer({
            name: 'Test Admin',
            password: 'password123',
            email: 'admin@test.com',
            number: '+32 0417 85 59 63',
            role,
            address: validAddress,
        });

        expect(customer.role).toBe(role);
    });

    // Test: Valid role 'klant'
    test('Given: valid role "klant", when: creating new Customer, then: role is set to "klant"', () => {
        const role: Role = 'klant';

        const customer = new Customer({
            name: 'Test Klant',
            password: 'password123',
            email: 'klant@test.com',
            number: '+32 0417 85 59 63',
            role,
            address: validAddress,
        });

        expect(customer.role).toBe(role);
    });

    // Test: Valid role 'banned'
    test('Given: valid role "banned", when: creating new Customer, then: role is set to "banned"', () => {
        const role: Role = 'banned';

        const customer = new Customer({
            name: 'Test Banned',
            password: 'password123',
            email: 'banned@test.com',
            number: '+32 0417 85 59 63',
            role,
            address: validAddress,
        });

        expect(customer.role).toBe(role);
    });

    // Test: Missing role should throw error
    test('Given: missing role, when: creating new Customer, then: throw "Role is required"', () => {
        expect(
            () =>
                new Customer({
                    name: 'Test User',
                    password: 'password123',
                    email: 'user@test.com',
                    number: '+32 0417 85 59 63',
                    role: undefined as unknown as Role, // Missing role
                    address: validAddress,
                })
        ).toThrow('Role is required');
    });

    // Test: Setting valid role should update role correctly
    test('Given: valid Customer, when: setting new role "admin", then: role is updated to "admin"', () => {
        const customer = new Customer({
            name: 'Test User',
            password: 'password123',
            email: 'user@test.com',
            number: '+32 0417 85 59 63',
            role: 'klant', // Initial role
            address: validAddress,
        });

        customer.setRole('admin');
        expect(customer.getRole()).toBe('admin');
    });
});
