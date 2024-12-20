import { Product } from '../../model/Product';

describe('Product Class', () => {
    test('Given: valid values for Product, when: creating new Product, then: new Product is created', () => {
        const product = new Product({
            id: 1,
            name: 'Test Product',
            description: 'A test product description',
            price: 10.99,
            category: 'Electronics',
            image: 'image_url',
            stock: 100,
        });

        expect(product.getproductid()).toBe(1);
        expect(product.getname()).toBe('Test Product');
        expect(product.getdescription()).toBe('A test product description');
        expect(product.getprice()).toBe(10.99);
        expect(product.getcategory()).toBe('Electronics');
        expect(product.getimage()).toBe('image_url');
        expect(product.getstock()).toBe(100);
    });

    test("Given: missing name, when: creating new Product, then: throw 'Name is required'", () => {
        expect(
            () =>
                new Product({
                    id: 1,
                    name: '',
                    description: 'A test product description',
                    price: 10.99,
                    category: 'Electronics',
                    image: 'image_url',
                    stock: 100,
                })
        ).toThrow('Name is required');
    });

    test("Given: missing description, when: creating new Product, then: throw 'Description is required'", () => {
        expect(
            () =>
                new Product({
                    id: 1,
                    name: 'Test Product',
                    description: '',
                    price: 10.99,
                    category: 'Electronics',
                    image: 'image_url',
                    stock: 100,
                })
        ).toThrow('Description is required');
    });

    test("Given: negative price, when: creating new Product, then: throw 'Price must be a non-negative number'", () => {
        expect(
            () =>
                new Product({
                    id: 1,
                    name: 'Test Product',
                    description: 'A test product description',
                    price: -10.99,
                    category: 'Electronics',
                    image: 'image_url',
                    stock: 100,
                })
        ).toThrow('Price must be a non-negative number');
    });

    test("Given: missing category, when: creating new Product, then: throw 'Category is required'", () => {
        expect(
            () =>
                new Product({
                    id: 1,
                    name: 'Test Product',
                    description: 'A test product description',
                    price: 10.99,
                    category: '',
                    image: 'image_url',
                    stock: 100,
                })
        ).toThrow('Category is required');
    });

    test("Given: missing image, when: creating new Product, then: throw 'Image is required'", () => {
        expect(
            () =>
                new Product({
                    id: 1,
                    name: 'Test Product',
                    description: 'A test product description',
                    price: 10.99,
                    category: 'Electronics',
                    image: '',
                    stock: 100,
                })
        ).toThrow('Image is required');
    });

    test("Given: negative stock, when: creating new Product, then: throw 'Stock must be a non-negative number'", () => {
        expect(
            () =>
                new Product({
                    id: 1,
                    name: 'Test Product',
                    description: 'A test product description',
                    price: 10.99,
                    category: 'Electronics',
                    image: 'image_url',
                    stock: -100,
                })
        ).toThrow('Stock must be a non-negative number');
    });

    test('Given: valid Product, when: updating name, then: name is updated', () => {
        const product = new Product({
            id: 1,
            name: 'Old Name',
            description: 'A test product description',
            price: 10.99,
            category: 'Electronics',
            image: 'image_url',
            stock: 100,
        });
        product.setname('New Name');
        expect(product.getname()).toBe('New Name');
    });

    test('Given: valid Product, when: updating price, then: price is updated', () => {
        const product = new Product({
            id: 1,
            name: 'Test Product',
            description: 'A test product description',
            price: 10.99,
            category: 'Electronics',
            image: 'image_url',
            stock: 100,
        });
        product.setprice(15.99);
        expect(product.getprice()).toBe(15.99);
    });

    test('Given: valid Product, when: updating stock, then: stock is updated', () => {
        const product = new Product({
            id: 1,
            name: 'Test Product',
            description: 'A test product description',
            price: 10.99,
            category: 'Electronics',
            image: 'image_url',
            stock: 100,
        });
        product.setstock(150);
        expect(product.getstock()).toBe(150);
    });

    test('Given: valid Product, when: updating category, then: category is updated', () => {
        const product = new Product({
            id: 1,
            name: 'Test Product',
            description: 'A test product description',
            price: 10.99,
            category: 'Electronics',
            image: 'image_url',
            stock: 100,
        });
        product.setcategory('Appliances');
        expect(product.getcategory()).toBe('Appliances');
    });

    test('Given: two identical products, when: comparing them, then: equals returns true', () => {
        const product1 = new Product({
            id: 1,
            name: 'Test Product',
            description: 'A test product description',
            price: 10.99,
            category: 'Electronics',
            image: 'image_url',
            stock: 100,
        });
        const product2 = new Product({
            id: 1,
            name: 'Test Product',
            description: 'A test product description',
            price: 10.99,
            category: 'Electronics',
            image: 'image_url',
            stock: 100,
        });
        expect(product1.equals(product2)).toBe(true);
    });

    test('Given: two different products, when: comparing them, then: equals returns false', () => {
        const product1 = new Product({
            id: 1,
            name: 'Test Product',
            description: 'A test product description',
            price: 10.99,
            category: 'Electronics',
            image: 'image_url',
            stock: 100,
        });
        const product2 = new Product({
            id: 2,
            name: 'Another Product',
            description: 'Another description',
            price: 15.99,
            category: 'Appliances',
            image: 'another_image_url',
            stock: 50,
        });
        expect(product1.equals(product2)).toBe(false);
    });
});
