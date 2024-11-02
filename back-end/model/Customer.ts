import { Address } from "./Address";

export class Customer {
    customer_id?: number;
    name: string;
    password: string;
    email: string;
    number: string;
    address: Address;
  
    constructor(customer : {customer_id? : number, name: string, password: string, email: string, number: string, address: Address}) {
        this.validate(customer);

        this.customer_id = customer.customer_id;
        this.name = customer.name;
        this.password = customer.password;
        this.email = customer.email;
        this.number = customer.number;
        this.address = customer.address;
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

    getAddress(): Address {
        return this.address;
    }

    setAddress(value : Address) : void {
        this.address = value;
    }

    validate(customer: {name : string, password : string, email : string, number : string, address : Address}){
        if (!customer.name){
            throw new Error("Name is required");
        }

        if(!customer.password){
            throw new Error("Password is required");            
        }

        if(!customer.email){
            throw new Error("Email is required");            
        }

        if(!customer.number){
            throw new Error("Number is required");            
        }

        if(!customer.address){
            throw new Error("Address is required");
            
        }
    }
}
  