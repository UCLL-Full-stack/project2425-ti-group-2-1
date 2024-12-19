import { Order } from '../../model/Order';
import { Customer } from '../../model/Customer';
import { Address } from '../../model/Address';
import { Product } from '../../model/Product';

describe('Order Class', () => {
    let validAddress: Address;
    let validCustomer: Customer;
    let validProducts: Product[];

    beforeEach(() => {
        validAddress = new Address({
            housecode: '1234abc',
            street: 'pinkystreet',
            postalcode: '2525',
        });

        validCustomer = new Customer({
            name: 'Jhonny',
            password: 'blabla',
            email: 'Jhonny.bravo@gmail.com',
            number: '+32 0417 85 59 63',
            address: validAddress,
        });

        validProducts = [
            new Product({
                name: 'Product1',
                description: 'Description of Product1',
                price: 100,
                category: 'Category1',
                image: 'product1.jpg',
                stock: 10,
            }),
        ];
    });

    test('Given: valid values for Order, when: creating new Order, then: new Order is created', () => {
        const totalprice = 100;
        const date = new Date();
        const send = false;

        const order = new Order(totalprice, date, send, validAddress, validCustomer, validProducts);

        expect(order.getTotalPrice()).toBe(totalprice);
        expect(order.getDate()).toBe(date);
        expect(order.isSent()).toBe(send);
        expect(order.getAddressID()).toBe(validAddress);
        expect(order.getCustomerID()).toBe(validCustomer);
        expect(order.getProducts()).toBe(validProducts);
    });

    test('Given: missing totalprice, when: creating new Order, then: throw "Total price is required and cannot be negative."', () => {
        expect(
            () =>
                new Order(
                    undefined as unknown as number,
                    new Date(),
                    false,
                    validAddress,
                    validCustomer,
                    validProducts
                )
        ).toThrow('Total price is required and cannot be negative.');
    });

    test('Given: negative totalprice, when: creating new Order, then: throw "Total price is required and cannot be negative."', () => {
        expect(
            () => new Order(-1, new Date(), false, validAddress, validCustomer, validProducts)
        ).toThrow('Total price is required and cannot be negative.');
    });

    test('Given: missing date, when: creating new Order, then: throw "Date is required."', () => {
        expect(
            () =>
                new Order(
                    100,
                    undefined as unknown as Date,
                    false,
                    validAddress,
                    validCustomer,
                    validProducts
                )
        ).toThrow('Date is required.');
    });

    test('Given: missing send status, when: creating new Order, then: throw "Send status is required."', () => {
        expect(
            () =>
                new Order(
                    100,
                    new Date(),
                    undefined as unknown as boolean,
                    validAddress,
                    validCustomer,
                    validProducts
                )
        ).toThrow('Send status is required.');
    });

    test('Given: missing address, when: creating new Order, then: throw "Address is required."', () => {
        expect(
            () =>
                new Order(
                    100,
                    new Date(),
                    false,
                    undefined as unknown as Address,
                    validCustomer,
                    validProducts
                )
        ).toThrow('Address is required.');
    });

    test('Given: missing customer, when: creating new Order, then: throw "Customer is required."', () => {
        expect(
            () =>
                new Order(
                    100,
                    new Date(),
                    false,
                    validAddress,
                    undefined as unknown as Customer,
                    validProducts
                )
        ).toThrow('Customer is required.');
    });

    test('Given: missing products, when: creating new Order, then: throw "At least one product is required."', () => {
        expect(() => new Order(100, new Date(), false, validAddress, validCustomer, [])).toThrow(
            'At least one product is required.'
        );
    });

    test('Given: valid Order, when: updating totalprice, then: totalprice is updated', () => {
        const order = new Order(100, new Date(), false, validAddress, validCustomer, validProducts);
        order.setTotalPrice(200);
        expect(order.getTotalPrice()).toBe(200);
    });

    test('Given: valid Order, when: updating date, then: date is updated', () => {
        const order = new Order(100, new Date(), false, validAddress, validCustomer, validProducts);
        const newDate = new Date();
        order.setDate(newDate);
        expect(order.getDate()).toBe(newDate);
    });

    test('Given: valid Order, when: updating send status, then: send status is updated', () => {
        const order = new Order(100, new Date(), false, validAddress, validCustomer, validProducts);
        order.setSent(true);
        expect(order.isSent()).toBe(true);
    });

    test('Given: valid Order, when: updating address, then: address is updated', () => {
        const order = new Order(100, new Date(), false, validAddress, validCustomer, validProducts);
        const newAddress = new Address({
            housecode: '5678xyz',
            street: 'bluestreet',
            postalcode: '2526',
        });
        order.setAddress(newAddress);
        expect(order.getAddressID()).toBe(newAddress);
    });

    test('Given: valid Order, when: updating customer, then: customer is updated', () => {
        const order = new Order(100, new Date(), false, validAddress, validCustomer, validProducts);
        const newCustomer = new Customer({
            name: 'NewCustomer',
            password: 'newpassword',
            email: 'newemail@gmail.com',
            number: '+32 0417 85 59 64',
            address: validAddress,
        });
        order.setCustomer(newCustomer);
        expect(order.getCustomerID()).toBe(newCustomer);
    });

    test('Given: valid Order, when: updating products, then: products are updated', () => {
        const newProduct = new Product({
            name: 'Product2',
            description: 'Description of Product2',
            price: 150,
            category: 'Category2',
            image: 'product2.jpg',
            stock: 5,
        });
        const order = new Order(100, new Date(), false, validAddress, validCustomer, validProducts);
        order.setProducts([newProduct]);
        expect(order.getProducts()).toEqual([newProduct]);
    });

    test('Given: valid Order, when: setting empty products, then: throw "At least one product is required."', () => {
        const order = new Order(100, new Date(), false, validAddress, validCustomer, validProducts);
        expect(() => order.setProducts([])).toThrow('At least one product is required.');
    });

    test('Given: valid Order, when: setting undefined address, then: throw "Address is required."', () => {
        const order = new Order(100, new Date(), false, validAddress, validCustomer, validProducts);
        expect(() => order.setAddress(undefined as unknown as Address)).toThrow(
            'Address is required.'
        );
    });
});
