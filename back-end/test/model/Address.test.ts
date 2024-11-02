import { Address } from "../../model/Address";

test('Given: valid values for Address, when: creating new address, then: new address is created', () => {
    const housecode = "1234Abc";
    const street = "shpekkiestreet";
    const postalcode = "2525";

    const address = new Address({housecode, street, postalcode});

    expect(address.housecode).toBe(housecode);
    expect(address.street).toBe(street);
    expect(address.postalcode).toBe(postalcode);
});