import { Product } from '../model/Product';
import database from './database';
import { Product as ProductPrisma } from '@prisma/client';

const getAllProducts = async (): Promise<Product[]> => {
    try {
        const productPrisma = await database.product.findMany();
        return productPrisma.map((productPrisma: ProductPrisma) => Product.from(productPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('database error');
    }
};

const deleteProduct = async (productId: number): Promise<Product | null> => {
    try {
        console.log(`Attempting to delete product with ID: ${productId}`);

        const productPrisma = await database.product.findUnique({
            where: { id: productId },
        });

        if (!productPrisma) {
            console.log(`Product with ID ${productId} does not exist in the database.`);
            return null; // Product doesn't exist
        }

        await database.product.delete({
            where: { id: productId },
        });

        console.log(`Product with ID ${productId} deleted successfully.`);
        return Product.from(productPrisma); // Return the deleted product
    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error('Failed to delete the product');
    }
};

const findProductById = async (id: number): Promise<ProductPrisma | null> => {
    return await database.product.findUnique({ where: { id } });
};

export default { getAllProducts, deleteProduct, findProductById };
