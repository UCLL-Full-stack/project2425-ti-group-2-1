import { Request, Response } from "express";
import { ProductService } from "../service/product.service";
import { ProductRepository } from "../repository/product.db";

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

export class ProductController {
    async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            console.error("Error in ProductController - getAllProducts:", error);
            res.status(500).json({ message: "Failed to fetch products." });
        }
    }
}
