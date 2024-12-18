import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductRepository {
    async getAllProducts(): Promise<ReturnType<typeof prisma.product.findMany>> {
        try {
            return await prisma.product.findMany();
        } catch (error) {
            console.error("Error fetching products:", error);
            throw new Error("Failed to fetch products.");
        }
    }
}

