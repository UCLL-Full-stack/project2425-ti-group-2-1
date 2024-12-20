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

// Mock function
jest.mock('../../repository/product.db', () => ({
    getAllProducts: jest.fn(),
}));

describe('Product Service - Get All Products Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    test('Given: products exist, when: retrieving all products, then: return a list of products', async () => {
        // Mock database response
        (productDB.getAllProducts as jest.Mock).mockResolvedValue([mockProduct]);

        const result = await productService.getAllProducts();

        expect(productDB.getAllProducts).toHaveBeenCalled();
        expect(result).toEqual([mockProduct]);
    });

    test('Given: no products in database, when: retrieving all products, then: return an empty list', async () => {
        // Mock empty database response
        (productDB.getAllProducts as jest.Mock).mockResolvedValue([]);

        const result = await productService.getAllProducts();

        expect(productDB.getAllProducts).toHaveBeenCalled();
        expect(result).toEqual([]);
    });

    test('Given: error occurs during product retrieval, when: retrieving all products, then: throw error', async () => {
        // Mock database error
        (productDB.getAllProducts as jest.Mock).mockRejectedValue(new Error('database error'));

        await expect(productService.getAllProducts()).rejects.toThrow(
            'Failed to retrieve products.'
        );
        expect(productDB.getAllProducts).toHaveBeenCalled();
    });
});
