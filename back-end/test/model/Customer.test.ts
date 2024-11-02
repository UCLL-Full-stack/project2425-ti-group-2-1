import { Customer } from "../../model/Customer";
import { Address } from "../../model/Address";

test('Given: valid values for Customer, when: creating new Customer, then: new Customer is created', () => {
    const name = "Jhonny";
    const password = "blabla";
    const email=  "Jhonny.bravo@gmail.com";
    const number = "+32 0417 85 59 63";
    const address = new Address({housecode: "1234abc", street: "pinkystreet",postalcode: "2525"});

    const customer = new Customer({name, password, email, number, address});

    expect(customer.name).toBe(name);
    expect(customer.password).toBe(password);
    expect(customer.email).toBe(email);
    expect(customer.number).toBe(number);
    expect(customer.address).toBe(address);
});