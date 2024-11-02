import { Address } from "../../model/Address";

describe('Address Class', () => {

    test('Given: valid values for Address, when: creating new Address, then: new Address is created', () => {
        const housecode = "1234abc";
        const street = "pinkystreet";
        const postalcode = "2525";

        const address = new Address({ housecode, street, postalcode });

        expect(address.housecode).toBe(housecode);
        expect(address.street).toBe(street);
        expect(address.postalcode).toBe(postalcode);
    });

    // Test cases for missing required fields
    test('Given: missing housecode, when: creating new Address, then: throw "House code is required"', () => {
        expect(() => new Address({
            housecode: "",
            street: "pinkystreet",
            postalcode: "2525"
        })).toThrow("House code is required");
    });

    test('Given: missing street, when: creating new Address, then: throw "Street is required"', () => {
        expect(() => new Address({
            housecode: "1234abc",
            street: "",
            postalcode: "2525"
        })).toThrow("Street is required");
    });

    test('Given: missing postalcode, when: creating new Address, then: throw "Postal code is required"', () => {
        expect(() => new Address({
            housecode: "1234abc",
            street: "pinkystreet",
            postalcode: ""
        })).toThrow("Postal code is required");
    });


    test('Given: valid Address, when: setting new housecode, then: housecode is updated', () => {
        const address = new Address({ housecode: "1234abc", street: "pinkystreet", postalcode: "2525" });
        address.setHouseCode("5678xyz");
        expect(address.getHouseCode()).toBe("5678xyz");
    });

    test('Given: valid Address, when: setting new street, then: street is updated', () => {
        const address = new Address({ housecode: "1234abc", street: "pinkystreet", postalcode: "2525" });
        address.setStreet("bluestreet");
        expect(address.getStreet()).toBe("bluestreet");
    });

    test('Given: valid Address, when: setting new postalcode, then: postalcode is updated', () => {
        const address = new Address({ housecode: "1234abc", street: "pinkystreet", postalcode: "2525" });
        address.setPostalCode("1000");
        expect(address.getPostalCode()).toBe("1000");
    });

    test('Given: valid Address, when: updating housecode and postalcode, then: both fields are updated correctly', () => {
        const address = new Address({ housecode: "1234abc", street: "pinkystreet", postalcode: "2525" });
        
        address.setHouseCode("7890xyz");
        address.setPostalCode("3030");

        expect(address.getHouseCode()).toBe("7890xyz");
        expect(address.getPostalCode()).toBe("3030");
    });

    test('Given: valid Address, when: updating street and housecode, then: both fields are updated correctly', () => {
        const address = new Address({ housecode: "1234abc", street: "pinkystreet", postalcode: "2525" });
        
        address.setStreet("greenstreet");
        address.setHouseCode("9876def");

        expect(address.getStreet()).toBe("greenstreet");
        expect(address.getHouseCode()).toBe("9876def");
    });

    test('Given: valid Address, when: setting empty housecode, then: throw "House code is required"', () => {
        const address = new Address({ housecode: "1234abc", street: "pinkystreet", postalcode: "2525" });
        expect(() => address.setHouseCode("")).toThrow("House code is required");
    });

    test('Given: valid Address, when: setting empty street, then: throw "Street is required"', () => {
        const address = new Address({ housecode: "1234abc", street: "pinkystreet", postalcode: "2525" });
        expect(() => address.setStreet("")).toThrow("Street is required");
    });

    test('Given: valid Address, when: setting empty postalcode, then: throw "Postal code is required"', () => {
        const address = new Address({ housecode: "1234abc", street: "pinkystreet", postalcode: "2525" });
        expect(() => address.setPostalCode("")).toThrow("Postal code is required");
    });
});