import { Product } from '../model/Product';
import productDB from '../repository/product.db';

const getAllProducts = async (): Promise<Product[]> => {
    try {
        return await productDB.getAllProducts();
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to retrieve products.");
    }
};

export default { getAllProducts };
