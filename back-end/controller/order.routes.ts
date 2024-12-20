/**
 * @swagger
 * components:
 *   schemas:
 *     OrderInput:
 *       type: object
 *       required:
 *         - email
 *         - products
 *         - totalPrice
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the customer placing the order.
 *           example: "john.doe@example.com"
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID of the product.
 *                 example: 101
 *           description: List of products with their IDs.
 *         totalPrice:
 *           type: number
 *           format: float
 *           description: Total price of the order.
 *           example: 149.99
 *     OrderResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID of the created order.
 *           example: 1
 *         totalPrice:
 *           type: number
 *           format: float
 *           description: Total price of the order.
 *           example: 149.99
 *         send:
 *           type: boolean
 *           description: Indicates if the order has been sent.
 *           example: false
 *         customerId:
 *           type: integer
 *           description: ID of the customer who placed the order.
 *           example: 42
 *         addressId:
 *           type: integer
 *           description: ID of the address associated with the order.
 *           example: 10
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 description: ID of the product.
 *                 example: 101
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product in the order.
 *                 example: 2
 */

import express, { Request, Response, NextFunction } from 'express';
import OrderService from '../service/order.service';

const orderRouter = express.Router();

/**
 * @swagger
 * /orders:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new order.
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       201:
 *         description: Order successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Server error.
 */
orderRouter.post('/orders', async (req: Request, res: Response, next: NextFunction) => {
    const { email, products, totalPrice } = req.body;

    // Validate if email, totalPrice, and products are provided
    if (!email || totalPrice === undefined || totalPrice === null || !Array.isArray(products)) {
        return res
            .status(400)
            .json({ message: 'Missing required fields: email, totalPrice, or products.' });
    }

    // Check if products array contains objects with id
    const validProducts = products.every(
        (product: { id: number }) => typeof product.id === 'number'
    );

    if (!validProducts) {
        return res.status(400).json({ message: 'Each product must have an id.' });
    }

    try {
        // Pass products without quantity as repository handles counting
        const newOrder = await OrderService.createOrder({
            email,
            products, // Send products as just ids (quantity will be handled in the service)
            totalPrice,
        });

        return res.status(201).json({
            message: 'Order successfully created',
            order: newOrder,
        });
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: 'Failed to create order' });
    }
});

export { orderRouter };
