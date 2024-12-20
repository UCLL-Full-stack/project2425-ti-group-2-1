import orderService from '../../service/order.service';
import database from '../../repository/database'; // Adjust path as needed
import { Product } from '../../model/Product'; // Adjust path to your Product class

// Mock data
const mockUser = {
    id: 1,
    email: 'user@example.com',
    address: { id: 1, street: '123 Main St', city: 'Test City', zip: '12345' },
};

const mockProduct = new Product({
    id: 1,
    name: 'Product A',
    description: 'A great product',
    price: 100,
    category: 'Electronics',
    image: 'image_url',
    stock: 10,
});

const mockCreateOrderInput = {
    email: 'user@example.com',
    products: [{ id: 1 }],
    totalPrice: 100,
};

jest.mock('../../repository/database', () => ({
    customer: {
        findUnique: jest.fn(),
    },
    order: {
        create: jest.fn(),
    },
    orderProduct: {
        createMany: jest.fn(),
    },
}));

describe('Order Service - Create Order Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear any mocks before each test
    });

    test('Given valid input, when creating order, then order should be created successfully', async () => {
        // Mock database responses
        (database.customer.findUnique as jest.Mock).mockResolvedValue(mockUser);
        (database.order.create as jest.Mock).mockResolvedValue({ id: 1, ...mockCreateOrderInput });
        (database.orderProduct.createMany as jest.Mock).mockResolvedValue({ count: 1 });

        const result = await orderService.createOrder(mockCreateOrderInput);

        expect(database.customer.findUnique).toHaveBeenCalledWith({
            where: { email: mockCreateOrderInput.email },
            include: { address: true },
        });
        expect(database.order.create).toHaveBeenCalled();
        expect(database.orderProduct.createMany).toHaveBeenCalled();
        expect(result).toEqual({ id: 1, ...mockCreateOrderInput });
    });

    test('Given no products, when creating order, then throw "Order must include at least one product."', async () => {
        const invalidInput = { ...mockCreateOrderInput, products: [] };

        await expect(orderService.createOrder(invalidInput)).rejects.toThrow(
            'Order must include at least one product.'
        );
    });

    test('Given no user found, when creating order, then throw "User not found."', async () => {
        (database.customer.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(orderService.createOrder(mockCreateOrderInput)).rejects.toThrow(
            'Unable to create order'
        );
    });

    test('Given database error, when creating order, then handle error gracefully', async () => {
        (database.customer.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'));

        await expect(orderService.createOrder(mockCreateOrderInput)).rejects.toThrow(
            'Unable to create order'
        );
    });

    test('Given multiple products in the order, when creating order, then order should have correct quantities', async () => {
        const inputWithMultipleProducts = {
            email: 'user@example.com',
            products: [{ id: 1 }, { id: 1 }, { id: 2 }],
            totalPrice: 300,
        };

        const mockProductB = new Product({
            id: 2,
            name: 'Product B',
            description: 'Another great product',
            price: 200,
            category: 'Electronics',
            image: 'image_url_2',
            stock: 5,
        });

        (database.customer.findUnique as jest.Mock).mockResolvedValue(mockUser);
        (database.order.create as jest.Mock).mockResolvedValue({
            id: 1,
            ...inputWithMultipleProducts,
        });
        (database.orderProduct.createMany as jest.Mock).mockResolvedValue({ count: 3 });

        const result = await orderService.createOrder(inputWithMultipleProducts);

        expect(database.orderProduct.createMany).toHaveBeenCalledWith({
            data: [
                { orderId: 1, productId: 1, quantity: 2 },
                { orderId: 1, productId: 2, quantity: 1 },
            ],
        });
        expect(result).toEqual({ id: 1, ...inputWithMultipleProducts });
    });
});
