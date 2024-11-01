export class Order {
    order_id: number;
    totalprice: number;
    date: Date;
    send: boolean;
    /*address_id: Address;
    customer_id: Customer;*/
  
    constructor(order_id: number, totalprice: number, date: Date, send: boolean, /*address_id: Address, customer_id: Customer*/) {
        this.order_id = order_id;
        this.totalprice = totalprice;
        this.date = date;
        this.send = send;
        /*this.address_id = address_id;
        this.customer_id = customer_id;*/
    }

    getOrderID(): number {
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

    /*getAddressID(): number {
        return this.address_id;
    }

    getCustomerID(): number {
        return this.customer_id;
    }*/
}
  