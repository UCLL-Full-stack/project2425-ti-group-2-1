import { Address as AddressPrisma } from '@prisma/client';

export class Address {
    id?: number;
    housecode: string;
    street: string;
    postalcode: string;

    constructor(address: { id?: number; housecode: string; street: string; postalcode: string }) {
        this.validate(address);

        this.id = address.id;
        this.housecode = address.housecode;
        this.street = address.street;
        this.postalcode = address.postalcode;
    }

    getAddressID(): number | undefined {
        return this.id;
    }

    getHouseCode(): string {
        return this.housecode;
    }

    setHouseCode(value: string): void {
        if (!value) {
            throw new Error('House code is required');
        }
        this.housecode = value;
    }

    getStreet(): string {
        return this.street;
    }

    setStreet(value: string): void {
        if (!value) {
            throw new Error('Street is required');
        }
        this.street = value;
    }

    getPostalCode(): string {
        return this.postalcode;
    }

    setPostalCode(value: string): void {
        if (!value) {
            throw new Error('Postal code is required');
        }
        this.postalcode = value;
    }

    validate(address: { housecode: string; street: string; postalcode: string }) {
        if (!address.housecode) {
            throw new Error('House code is required');
        }

        if (!address.street) {
            throw new Error('Street is required');
        }

        if (!address.postalcode) {
            throw new Error('Postal code is required');
        }
    }

    equals(other: Address): boolean {
        if (!other) {
            return false;
        }

        return (
            this.id === other.id &&
            this.housecode === other.housecode &&
            this.street === other.street &&
            this.postalcode === other.postalcode
        );
    }

    static from({ id, housecode, street, postalcode }: AddressPrisma) {
        return new Address({
            id,
            housecode,
            street,
            postalcode,
        });
    }
    
}
