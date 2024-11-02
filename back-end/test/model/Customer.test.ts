import { Customer } from "../../model/Customer";
import { Address } from "../../model/Address";

describe('Customer Class', () => {
    
    let validAddress: Address;

    beforeEach(() => {
        validAddress = new Address({
            housecode: "1234abc",
            street: "pinkystreet",
            postalcode: "2525"
        });
    });

    test('Given: valid values for Customer, when: creating new Customer, then: new Customer is created', () => {
        const name = "Jhonny";
        const password = "blabla";
        const email= "Jhonny.bravo@gmail.com";
        const number = "+32 0417 85 59 63";
        
        const customer = new Customer({name, password, email, number, address: validAddress});

        expect(customer.name).toBe(name);
        expect(customer.password).toBe(password);
        expect(customer.email).toBe(email);
        expect(customer.number).toBe(number);
        expect(customer.address).toBe(validAddress);
    });
    
    test('Given: missing name, when: creating new Customer, then: throw "Name is required"', () => {
        expect(() => new Customer({
            name: "",
            password: "blabla",
            email: "test@gmail.com",
            number: "+32 0417 85 59 63",
            address: validAddress
        })).toThrow("Name is required");
    });

    test('Given: missing password, when: creating new Customer, then: throw "Password is required"', () => {
        expect(() => new Customer({
            name: "Test",
            password: "",
            email: "test@gmail.com",
            number: "+32 0417 85 59 63",
            address: validAddress
        })).toThrow("Password is required");
    });

    test('Given: missing email, when: creating new Customer, then: throw "Email is required"', () => {
        expect(() => new Customer({
            name: "Test",
            password: "blabla",
            email: "",
            number: "+32 0417 85 59 63",
            address: validAddress
        })).toThrow("Email is required");
    });

    test('Given: missing number, when: creating new Customer, then: throw "Number is required"', () => {
        expect(() => new Customer({
            name: "Test",
            password: "blabla",
            email: "test@gmail.com",
            number: "",
            address: validAddress
        })).toThrow("Number is required");
    });

    test('Given: missing address, when: creating new Customer, then: throw "Address is required"', () => {
        expect(() => new Customer({
            name: "Test",
            password: "blabla",
            email: "test@gmail.com",
            number: "+32 0417 85 59 63",
            address: undefined as unknown as Address
        })).toThrow("Address is required");
    });

    test('Given: valid Customer, when: setting new name, then: name is updated', () => {
        const customer = new Customer({
            name: "Jhonny",
            password: "blabla",
            email: "test@gmail.com",
            number: "+32 0417 85 59 63",
            address: validAddress
        });
        customer.setName("NewName");
        expect(customer.getName()).toBe("NewName");
    });

    test('Given: valid Customer, when: setting new password, then: password is updated', () => {
        const customer = new Customer({
            name: "Jhonny",
            password: "blabla",
            email: "test@gmail.com",
            number: "+32 0417 85 59 63",
            address: validAddress
        });
        customer.setPassword("newPassword");
        expect(customer.getPassword()).toBe("newPassword");
    });

    test('Given: valid Customer, when: setting new email, then: email is updated', () => {
        const customer = new Customer({
            name: "Jhonny",
            password: "blabla",
            email: "test@gmail.com",
            number: "+32 0417 85 59 63",
            address: validAddress
        });
        customer.setEmail("newemail@gmail.com");
        expect(customer.getEmail()).toBe("newemail@gmail.com");
    });

    test('Given: valid Customer, when: setting new number, then: number is updated', () => {
        const customer = new Customer({
            name: "Jhonny",
            password: "blabla",
            email: "test@gmail.com",
            number: "+32 0417 85 59 63",
            address: validAddress
        });
        customer.setNumber("+32 0417 85 59 64");
        expect(customer.getNumber()).toBe("+32 0417 85 59 64");
    });

    test('Given: valid Customer, when: setting new address, then: address is updated', () => {
        const newAddress = new Address({ housecode: "5678xyz", street: "bluestreet", postalcode: "2526" });
        const customer = new Customer({
            name: "Jhonny",
            password: "blabla",
            email: "test@gmail.com",
            number: "+32 0417 85 59 63",
            address: validAddress
        });
        customer.setAddress(newAddress);
        expect(customer.getAddress()).toBe(newAddress);
    });

    test('Given: valid Customer, when: updating name, email, and number, then: all fields are updated correctly', () => {
        const customer = new Customer({
            name: "Jhonny",
            password: "blabla",
            email: "test@gmail.com",
            number: "+32 0417 85 59 63",
            address: validAddress
        });
        
        customer.setName("NewName");
        customer.setEmail("newemail@gmail.com");
        customer.setNumber("+32 0417 85 59 64");

        expect(customer.getName()).toBe("NewName");
        expect(customer.getEmail()).toBe("newemail@gmail.com");
        expect(customer.getNumber()).toBe("+32 0417 85 59 64");
    });

    test('Given: valid Customer, when: updating password and address, then: both fields are updated correctly', () => {
        const newAddress = new Address({
            housecode: "5678xyz",
            street: "bluestreet",
            postalcode: "1000"
        });

        const customer = new Customer({
            name: "Jhonny",
            password: "blabla",
            email: "test@gmail.com",
            number: "+32 0417 85 59 63",
            address: validAddress
        });

        customer.setPassword("newPassword123");
        customer.setAddress(newAddress);

        expect(customer.getPassword()).toBe("newPassword123");
        expect(customer.getAddress()).toBe(newAddress);
    });

    test('Given: valid Customer, when: setting empty name, then: throw "Name is required"', () => {
        const customer = new Customer({
            name: "Jhonny",
            password: "blabla",
            email: "test@gmail.com",
            number: "+32 0417 85 59 63",
            address: validAddress
        });
        expect(() => customer.setName("")).toThrow("Name is required");
    });

    test('Given: valid Customer, when: setting empty password, then: throw "Password is required"', () => {
        const customer = new Customer({
            name: "Jhonny",
            password: "blabla",
            email: "test@gmail.com",
            number: "+32 0417 85 59 63",
            address: validAddress
        });
        expect(() => customer.setPassword("")).toThrow("Password is required");
    });

    test('Given: valid Customer, when: setting empty email, then: throw "Email is required"', () => {
        const customer = new Customer({
            name: "Jhonny",
            password: "blabla",
            email: "test@gmail.com",
            number: "+32 0417 85 59 63",
            address: validAddress
        });
        expect(() => customer.setEmail("")).toThrow("Email is required");
    });

    test('Given: valid Customer, when: setting empty number, then: throw "Number is required"', () => {
        const customer = new Customer({
            name: "Jhonny",
            password: "blabla",
            email: "test@gmail.com",
            number: "+32 0417 85 59 63",
            address: validAddress
        });
        expect(() => customer.setNumber("")).toThrow("Number is required");
    });

    test('Given: valid Customer, when: setting undefined address, then: throw "Address is required"', () => {
        const customer = new Customer({
            name: "Jhonny",
            password: "blabla",
            email: "test@gmail.com",
            number: "+32 0417 85 59 63",
            address: validAddress
        });
        expect(() => customer.setAddress(undefined as unknown as Address)).toThrow("Address is required");
    });
});