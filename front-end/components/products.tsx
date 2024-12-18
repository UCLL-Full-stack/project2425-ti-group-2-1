import { useState, useEffect } from "react";
import HomeService from "@/services/HomeService";
import styles from "../styles/Product.module.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  category: string;
}

const OverViewItems: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await HomeService.handleGetProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        setError("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product Overview</h1>
      {error && <p>{error}</p>}

      <div className={styles.gridContainer}>
        {products.map((product) => (
          <div key={product.id} className={styles.gridItem}>
            <img src={product.image} alt={product.name} className={styles.productImage} />
            <h2 className={styles.productTitle}>{product.name}</h2>
            <p className={styles.productDescription}>{product.description}</p>
            <p className={styles.productPrice}>Price: ${product.price}</p>
            <p className={styles.productStock}>Stock: {product.stock}</p>
            <p className={styles.productCategory}>category: {product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverViewItems;
