import { Product } from "../model/Product";
import { ProductRepository } from "../repository/product.db";
import { PrismaClient } from "@prisma/client";

export class ProductService {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async getAllProducts(): Promise<Product[]> {
        try {
            const products = await this.productRepository.getAllProducts();
            return products;
        } catch (error) {
            console.error("Error in ProductService - getAllProducts:", error);
            throw new Error("Failed to retrieve products.");
        }
    }
}
