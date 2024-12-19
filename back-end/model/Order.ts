import { Address } from './Address';
import { Customer } from './Customer';
import { Product } from './Product';

export class Order {
  order_id?: number;
  totalprice: number;
  date: Date;
  send: boolean;
  address: Address;
  customer: Customer;
  products: { product: Product; quantity: number }[];  // Fixed to store product and quantity

  constructor(
    totalprice: number,
    date: Date,
    send: boolean,
    address: Address,
    customer: Customer,
    products: { product: Product; quantity: number }[] = [] // Default to empty array
  ) {
    this.validate({ totalprice, date, send, address, customer, products });
    this.totalprice = totalprice;
    this.date = date;
    this.send = send;
    this.address = address;
    this.customer = customer;
    this.products = products;
  }

  private validate(order: {
    totalprice: number;
    date: Date;
    send: boolean;
    address: Address;
    customer: Customer;
    products: { product: Product; quantity: number }[];
  }): void {
    if (order.totalprice === undefined || order.totalprice < 0) {
      throw new Error('Total price is required and cannot be negative.');
    }

    if (!order.date) {
      throw new Error('Date is required.');
    }

    if (order.send === undefined) {
      throw new Error('Send status is required.');
    }

    if (!order.address) {
      throw new Error('Address is required.');
    }

    if (!order.customer) {
      throw new Error('Customer is required.');
    }

    if (!order.products || order.products.length === 0) {
      throw new Error('At least one product is required.');
    }
  }

  getOrderID(): number | undefined {
    return this.order_id;
  }

  getTotalPrice(): number {
    return this.totalprice;
  }

  setTotalPrice(value: number): void {
    if (value === undefined || value < 0) {
      throw new Error('Total price is required and cannot be negative.');
    }
    this.totalprice = value;
  }

  getDate(): Date {
    return this.date;
  }

  setDate(value: Date): void {
    if (!value) {
      throw new Error('Date is required.');
    }
    this.date = value;
  }

  isSent(): boolean {
    return this.send;
  }

  setSent(value: boolean): void {
    if (value === undefined) {
      throw new Error('Send status is required.');
    }
    this.send = value;
  }

  getAddressID(): Address {
    return this.address;
  }

  getCustomerID(): Customer {
    return this.customer;
  }

  // Returns the list of products with their quantities
  getProducts(): { product: Product; quantity: number }[] {
    return this.products || []; // Return empty array if null
  }

  setAddress(value: Address): void {
    if (!value) {
      throw new Error('Address is required.');
    }
    this.address = value;
  }

  setCustomer(value: Customer): void {
    if (!value) {
      throw new Error('Customer is required.');
    }
    this.customer = value;
  }

  setProducts(value: { product: Product; quantity: number }[]): void {
    if (!value || value.length === 0) {
      throw new Error('At least one product is required.');
    }
    this.products = value;
  }
}
