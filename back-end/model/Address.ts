export class Address {
    address_id?: number;
    housecode: string;
    street: string;
    postalcode: string;

    constructor(address: {housecode: string, street: string, postalcode: string}) {
        this.validate(address);

        this.housecode = address.housecode;
        this.street = address.street;
        this.postalcode = address.postalcode;
    }

    getAddressID(): number | undefined{
        return this.address_id;
    }

    getHouseCode(): string {
        return this.housecode;
    }

    setHouseCode(value: string): void {
        this.housecode = value;
    }

    getStreet(): string {
        return this.street;
    }

    setStreet(value: string): void {
        this.street = value;
    }

    getPostalCode(): string {
        return this.postalcode;
    }

    setPostalCode(value: string): void {
        this.postalcode = value;
    }

    validate(address: {housecode: string, street: string, postalcode: string, address_id?: number}) {
        if (!address.housecode) {
            throw new Error("House code is required");
        }

        if (!address.street) {
            throw new Error("Street is required");
        }

        if (!address.postalcode) {
            throw new Error("Postal code is required");
        }
    }
}
