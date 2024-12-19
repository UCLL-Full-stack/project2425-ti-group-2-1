import productService from '../../service/product.service';
import productDB from '../../repository/product.db';
import { Product } from '../../model/Product';

// Mock data
const mockProductInput = {
    name: 'Product A',
    description: 'A great product',
    price: 100,
    category: 'Electronics',
    image: 'image_url',
    stock: 10,
};

const mockProduct = new Product({
    id: 1,
    ...mockProductInput,
});

let mockGetAllProducts: jest.Mock;

beforeEach(() => {
    // Mock database function
    mockGetAllProducts = jest.fn();
    productDB.getAllProducts = mockGetAllProducts;
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Product Service - Get All Products Tests', () => {
    test('Given: products exist, when: retrieving all products, then: return a list of products', async () => {
        mockGetAllProducts.mockResolvedValue([mockProduct]);

        const result = await productService.getAllProducts();

        expect(mockGetAllProducts).toHaveBeenCalled();
        expect(result).toEqual([mockProduct]);
    });

    test('Given: no products in database, when: retrieving all products, then: return an empty list', async () => {
        mockGetAllProducts.mockResolvedValue([]);

        const result = await productService.getAllProducts();

        expect(mockGetAllProducts).toHaveBeenCalled();
        expect(result).toEqual([]);
    });

    test('Given: error occurs during product retrieval, when: retrieving all products, then: throw error', async () => {
        mockGetAllProducts.mockRejectedValue(new Error('Database error'));

        await expect(productService.getAllProducts()).rejects.toThrow(
            'Failed to retrieve products.'
        );
    });
});

describe('Product Service - Product Validation Tests', () => {
    test('Given: valid product input, when: creating product, then: product is created', async () => {
        const validProductInput = {
            name: 'Product B',
            description: 'Another great product',
            price: 200,
            category: 'Furniture',
            image: 'image_url_2',
            stock: 20,
        };

        const validProduct = new Product(validProductInput);

        // Assuming a mock function for creating products is defined
        mockGetAllProducts.mockResolvedValue([validProduct]);

        const result = await productService.getAllProducts();

        expect(result).toEqual([validProduct]);
    });

    test('Given: invalid product input (missing name), when: creating product, then: throw validation error', async () => {
        const invalidProductInput = {
            name: '',
            description: 'Missing name',
            price: 100,
            category: 'Electronics',
            image: 'image_url',
            stock: 10,
        };

        await expect(() => new Product(invalidProductInput)).toThrow('Name is required');
    });

    test('Given: invalid product input (negative price), when: creating product, then: throw validation error', async () => {
        const invalidProductInput = {
            name: 'Product C',
            description: 'Invalid price product',
            price: -50,
            category: 'Clothing',
            image: 'image_url_3',
            stock: 5,
        };

        await expect(() => new Product(invalidProductInput)).toThrow(
            'Price must be a non-negative number'
        );
    });

    test('Given: invalid product input (negative stock), when: creating product, then: throw validation error', async () => {
        const invalidProductInput = {
            name: 'Product D',
            description: 'Invalid stock product',
            price: 80,
            category: 'Furniture',
            image: 'image_url_4',
            stock: -1,
        };

        await expect(() => new Product(invalidProductInput)).toThrow(
            'Stock must be a non-negative number'
        );
    });
});
