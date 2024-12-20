import { PrismaClient } from '@prisma/client';
import { Product } from '../model/Product';
import productDB from '../repository/product.db';

const getAllProducts = async (): Promise<Product[]> => {
    try {
        return await productDB.getAllProducts();
    } catch (error) {
        throw new Error('Failed to retrieve products.');
    }
};

const deleteProduct = async (productId: number): Promise<Product | null> => {
    const prisma = new PrismaClient();
    try {
        console.log(`Attempting to delete product with ID: ${productId}`);

        // Check if the product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id: productId },
        });
        if (!existingProduct) {
            console.log(`Product with ID ${productId} not found.`);
            return null; // Product not found
        }

        console.log(
            `Product with ID ${productId} exists. Proceeding to delete related OrderProduct entries.`
        );

        // Delete related entries in OrderProduct first
        await prisma.orderProduct.deleteMany({
            where: {
                productId: productId,
            },
        });

        console.log(
            `Successfully deleted related OrderProduct entries for product ID: ${productId}`
        );

        // Now delete the product itself
        const deletedProduct = await prisma.product.delete({
            where: { id: productId },
        });

        console.log(`Successfully deleted product with ID: ${productId}`);

        // Convert raw Prisma result into your custom Product class
        return Product.from(deletedProduct); // Wrap in the Product class instance
    } catch (error) {
        console.error(`Error occurred while deleting product with ID ${productId}:`, error);
        throw new Error(`Failed to delete the product with ID ${productId}. Error: ${error}`);
    } finally {
        // Optionally close Prisma client connection if not globally handled
        await prisma.$disconnect();
    }
};

export default { getAllProducts, deleteProduct };
