/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *           description: Product name.
 *         description:
 *           type: string
 *           description: Product description.
 *         price:
 *           type: number
 *           format: float
 *           description: Product price.
 *         category:
 *           type: string
 *           description: Product category.
 *     ProductInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Product name.
 *         description:
 *           type: string
 *           description: Product description.
 *         price:
 *           type: number
 *           format: float
 *           description: Product price.
 *         category:
 *           type: string
 *           description: Product category.
 *       required:
 *         - name
 *         - description
 *         - price
 *         - category
 */

import express, { Request, Response, NextFunction } from 'express';
import ProductService from '../service/product.service';
import { ProductInput } from '../types';

const productRouter = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products.
 *     responses:
 *       200:
 *         description: A list of all products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server Error.
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
