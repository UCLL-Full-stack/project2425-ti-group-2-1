import { Address } from "./Address";

export class Customer {
    customer_id?: number;
    name: string;
    password: string;
    email: string;
    number: string;
    address: Address;
  
    constructor(name: string, password: string, email: string, number: string, address_id: Address) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.number = number;
        this.address = address_id;
    }

    getCustomerID(): number | undefined {
        return this.customer_id;
    }

    getName(): string {
        return this.name;
    }

    setName(value: string): void {
        this.name = value;
    }

    getPassword(): string {
        return this.password;
    }

    setPassword(value: string): void {
        this.password = value;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(value: string): void {
        this.email = value;
    }

    getNumber(): string {
        return this.number;
    }

    setNumber(value: string): void {
        this.number = value;
    }

    getAddressID(): Address {
        return this.address;
    }

    setAddressID(value : number) : void {
        this.address = this.address;
    }
}
  