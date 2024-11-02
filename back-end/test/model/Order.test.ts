import { set } from 'date-fns';
import { Customer } from "../../model/Customer";
import { Product } from "../../model/Product";
import { Address } from '../../model/Address';
import { Order } from '../../model/Order';

test('Given: valid values for Customer, when: creating new Customer, then: new Customer is created', () => {
    const product1 = new Product(
        "Laptop",
        "A high-end gaming laptop with powerful performance.",
        1500,
        "Electronics"
    );

    const product2 = new Product(
        "vodka",
        "37,5%, made with potatoes",
        15,
        "alchohol"
    );
    
    const totalprice = 20;
    const date = set(new Date(), { year: 2024, month: 11, date: 1 });
    const send = false;
    const address = new Address({housecode: "1234abc", street: "pinkystreet", postalcode: "2525"});
    const customer = new Customer({ name: "Jhonny", password: "password", email: "jhonny.sins@gmail.com", number: "+32 0471 48 55 64", address});
    const products = [product1, product2];

    const order = new Order(totalprice, date, send, address, customer, products);

    expect(order.totalprice).toBe(totalprice);
    expect(order.date).toBe(date);
    expect(order.send).toBe(send);
    expect(order.address).toBe(address);
    expect(order.customer).toBe(customer);
    expect(order.products).toContain(product1);
    expect(order.products).toContain(product2);
});