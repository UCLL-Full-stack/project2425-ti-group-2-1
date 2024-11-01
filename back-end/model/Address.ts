export class Address {
    address_id?: number;
    housecode: string;
    street: string;
    postalcode: string;

    constructor(address_id: number, housecode: string, street: string, postalcode: string) {
        this.address_id = address_id;
        this.housecode = housecode;
        this.street = street;
        this.postalcode = postalcode;
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
}