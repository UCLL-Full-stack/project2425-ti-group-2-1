import { Product } from '../model/Product';
import productDB from '../repository/product.db';

const getAllProducts = async (): Promise<Product[]> => {
    try {
        return await productDB.getAllProducts();
    } catch (error) {
        throw new Error("Failed to retrieve products.");
    }
};

export default { getAllProducts };
