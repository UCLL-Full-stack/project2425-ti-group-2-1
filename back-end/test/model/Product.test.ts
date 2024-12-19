import { Product } from '../../model/Product';

describe('Product Class', () => {
    test('Given: valid values for Product, when: creating new Product, then: new Product is created', () => {
        const productData = {
            id: 1,
            name: 'Laptop',
            description: 'A powerful laptop',
            price: 1500,
            category: 'Electronics',
            image: 'laptop.jpg',
            stock: 10,
        };

        const product = new Product(productData);

        expect(product.getproductid()).toBe(productData.id);
        expect(product.getname()).toBe(productData.name);
        expect(product.getdescription()).toBe(productData.description);
        expect(product.getprice()).toBe(productData.price);
        expect(product.getcategory()).toBe(productData.category);
        expect(product.getimage()).toBe(productData.image);
        expect(product.getstock()).toBe(productData.stock);
    });

    test('Given: missing name, when: creating new Product, then: throw "Name is required"', () => {
        expect(
            () =>
                new Product({
                    id: 1,
                    name: '',
                    description: 'A powerful laptop',
                    price: 1500,
                    category: 'Electronics',
                    image: 'laptop.jpg',
                    stock: 10,
                })
        ).toThrow('Name is required');
    });

    test('Given: negative price, when: creating new Product, then: throw "Price must be a non-negative number"', () => {
        expect(
            () =>
                new Product({
                    id: 1,
                    name: 'Laptop',
                    description: 'A powerful laptop',
                    price: -100,
                    category: 'Electronics',
                    image: 'laptop.jpg',
                    stock: 10,
                })
        ).toThrow('Price must be a non-negative number');
    });

    test('Given: negative stock, when: creating new Product, then: throw "Stock must be a non-negative number"', () => {
        expect(
            () =>
                new Product({
                    id: 1,
                    name: 'Laptop',
                    description: 'A powerful laptop',
                    price: 1500,
                    category: 'Electronics',
                    image: 'laptop.jpg',
                    stock: -5,
                })
        ).toThrow('Stock must be a non-negative number');
    });

    test('Given: valid Product, when: updating name, then: name is updated', () => {
        const product = new Product({
            id: 1,
            name: 'Laptop',
            description: 'A powerful laptop',
            price: 1500,
            category: 'Electronics',
            image: 'laptop.jpg',
            stock: 10,
        });
        product.setname('Gaming Laptop');
        expect(product.getname()).toBe('Gaming Laptop');
    });

    test('Given: valid Product, when: updating price, then: price is updated', () => {
        const product = new Product({
            id: 1,
            name: 'Laptop',
            description: 'A powerful laptop',
            price: 1500,
            category: 'Electronics',
            image: 'laptop.jpg',
            stock: 10,
        });
        product.setprice(1800);
        expect(product.getprice()).toBe(1800);
    });

    test('Given: valid Product, when: setting negative price, then: throw "Price cannot be negative"', () => {
        const product = new Product({
            id: 1,
            name: 'Laptop',
            description: 'A powerful laptop',
            price: 1500,
            category: 'Electronics',
            image: 'laptop.jpg',
            stock: 10,
        });
        expect(() => product.setprice(-1)).toThrow('Price cannot be negative.');
    });

    test('Given: valid Product, when: setting negative stock, then: throw "Stock cannot be negative"', () => {
        const product = new Product({
            id: 1,
            name: 'Laptop',
            description: 'A powerful laptop',
            price: 1500,
            category: 'Electronics',
            image: 'laptop.jpg',
            stock: 10,
        });
        expect(() => product.setstock(-1)).toThrow('Stock cannot be negative.');
    });

    test('Given: valid Product, when: updating description, then: description is updated', () => {
        const product = new Product({
            id: 1,
            name: 'Laptop',
            description: 'A powerful laptop',
            price: 1500,
            category: 'Electronics',
            image: 'laptop.jpg',
            stock: 10,
        });
        product.setdescription('An ultra-powerful gaming laptop');
        expect(product.getdescription()).toBe('An ultra-powerful gaming laptop');
    });

    test('Given: valid Product, when: updating category, then: category is updated', () => {
        const product = new Product({
            id: 1,
            name: 'Laptop',
            description: 'A powerful laptop',
            price: 1500,
            category: 'Electronics',
            image: 'laptop.jpg',
            stock: 10,
        });
        product.setcategory('Gaming');
        expect(product.getcategory()).toBe('Gaming');
    });

    test('Given: valid Product, when: updating image, then: image is updated', () => {
        const product = new Product({
            id: 1,
            name: 'Laptop',
            description: 'A powerful laptop',
            price: 1500,
            category: 'Electronics',
            image: 'laptop.jpg',
            stock: 10,
        });
        product.setimage('gaming-laptop.jpg');
        expect(product.getimage()).toBe('gaming-laptop.jpg');
    });

    test('Given: two identical Products, when: comparing with equals, then: returns true', () => {
        const product1 = new Product({
            id: 1,
            name: 'Laptop',
            description: 'A powerful laptop',
            price: 1500,
            category: 'Electronics',
            image: 'laptop.jpg',
            stock: 10,
        });

        const product2 = new Product({
            id: 1,
            name: 'Laptop',
            description: 'A powerful laptop',
            price: 1500,
            category: 'Electronics',
            image: 'laptop.jpg',
            stock: 10,
        });

        expect(product1.equals(product2)).toBe(true);
    });

    test('Given: two different Products, when: comparing with equals, then: returns false', () => {
        const product1 = new Product({
            id: 1,
            name: 'Laptop',
            description: 'A powerful laptop',
            price: 1500,
            category: 'Electronics',
            image: 'laptop.jpg',
            stock: 10,
        });

        const product2 = new Product({
            id: 2,
            name: 'Tablet',
            description: 'A compact tablet',
            price: 500,
            category: 'Electronics',
            image: 'tablet.jpg',
            stock: 20,
        });

        expect(product1.equals(product2)).toBe(false);
    });
});
