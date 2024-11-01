export class Customer {
    customer_id: number;
    name: string;
    password: string;
    email: string;
    number: string;
    //address_id: Address;
  
    constructor(customer_id: number, name: string, password: string, email: string, number: string, /*address_id: Address*/) {
        this.customer_id = customer_id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.number = number;
        //this.address_id = address_id;
    }

    getCustomerID(): number {
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

    /*getAddressID(): number {
        return this.address_id;
    }

    setAddressID(value : number) : void {
        this.address_id = address_id;
    }*/
}
  