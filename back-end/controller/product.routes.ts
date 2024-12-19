/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the product.
 *         name:
 *           type: string
 *           description: The name of the product.
 *         description:
 *           type: string
 *           description: Detailed description of the product.
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the product in USD.
 *         category:
 *           type: string
 *           description: The category to which the product belongs.
 *         image:
 *           type: string
 *           description: URL to an image of the product.
 *         stock:
 *           type: number
 *           description: The number of items available in stock.
 *     ProductInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product.
 *         description:
 *           type: string
 *           description: Detailed description of the product.
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the product.
 *         category:
 *           type: string
 *           description: The category the product falls under.
 *         image:
 *           type: string
 *           description: URL of the product image.
 *         stock:
 *           type: number
 *           description: The quantity of the product available.
 *       required:
 *         - name
 *         - description
 *         - price
 *         - category
 *         - image
 *         - stock
 *   responses:
 *     ProductList:
 *       description: A list of products with their details.
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Product'
 *     ProductError:
 *       description: Error response when the server encounters an issue.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Description of the error.
 *               code:
 *                 type: integer
 *                 description: HTTP status code.
 *     UnauthorizedError:
 *       description: Error response when the user is not authorized.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Authorization error message.
 *               code:
 *                 type: integer
 *                 description: HTTP status code.
 */
import express, { Request, Response, NextFunction } from 'express';
import ProductService from '../service/product.service';
import { ProductInput } from '../types';

const productRouter = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve all products from the system.
 *     description: This endpoint returns a list of all available products with their details, including name, description, price, category, image URL, and stock.
 *     responses:
 *       200:
 *         description: Successfully fetched all products.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ProductList'
 *       401:
 *         description: Unauthorized. The request lacks valid authentication credentials.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Internal server error. Something went wrong while fetching the products.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/ProductError'
 */
productRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await ProductService.getAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});
export { productRouter };
