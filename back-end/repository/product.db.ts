import { Product } from "../model/Product";
import database from "./database";
import { Product as ProductPrisma } from '@prisma/client';


const getAllProducts = async (): Promise<Product[]> => {
    try {
        const productPrisma = await database.product.findMany();
        return productPrisma.map((productPrisma: ProductPrisma) => Product.from(productPrisma));
    } catch (error) {
        console.error(error);
        throw new Error("database error");
    }
};

export default { getAllProducts };