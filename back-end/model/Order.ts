import { Address } from "./Address";
import { Customer } from "./Customer";
import { Product } from "./Product";

export class Order {
    order_id?: number;
    totalprice: number;
    date: Date;
    send: boolean;
    address: Address;
    customer: Customer;
    products: Product[];
  
    constructor(order_id: number, totalprice: number, date: Date, send: boolean, address: Address, customer: Customer, products: Product[]) {
        this.order_id = order_id;
        this.totalprice = totalprice;
        this.date = date;
        this.send = send;
        this.address = address;
        this.customer = customer;
        this.products = products;
    }

    getOrderID(): number | undefined {
        return this.order_id;
    }

    getTotalPrice(): number {
        return this.totalprice;
    }

    setTotalPrice(value: number): void {
        if (value >= 0) {
            this.totalprice = value;
        } else {
            throw new Error("Total price cannot be negative.");
        }
    }

    getDate(): Date {
        return this.date;
    }

    setDate(value: Date): void {
        this.date = value;
    }

    isSent(): boolean {
        return this.send;
    }

    setSent(value: boolean): void {
        this.send = value;
    }

    getAddressID(): Address {
        return this.address;
    }

    getCustomerID(): Customer {
        return this.customer;
    }

    getProducts() : Product[] {
        return this.products;
    }
}
  