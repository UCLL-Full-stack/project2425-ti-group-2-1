import { useState, useEffect } from "react";
import HomeService from "@/services/HomeService";
import OrderService from "@/services/OrderService";
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
  const [cart, setCart] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

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

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handlePay = async () => {
    // Retrieve email from localStorage
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      setError("You must be logged in to place an order.");
      return;
    }

    const { email } = JSON.parse(loggedInUser);

    if (!email) {
      setError("Email is required to place an order.");
      return;
    }

    const orderData = {
      email: email, // Use the email from localStorage
      products: cart.map((item) => ({ id: item.id })),
      totalPrice: cart.reduce((sum, item) => sum + item.price, 0),
    };

    try {
      const response = await OrderService.handleCreateOrder(orderData);
      setMessage("Order successfully placed!");
      setCart([]); // Clear the cart after placing the order
    } catch (err) {
      setError("Failed to place the order.");
    }
  };

  return (
    <div>
      <div className={styles.rightBlock}>
        <h2 className={styles.ordertitle}>Shopping list</h2>
        <hr className={styles.line} />
        {cart.length > 0 ? (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
        <button
          className={styles.paybutton}
          onClick={handlePay}
          disabled={cart.length === 0}
        >
          Pay
        </button>
        {message && <p className={styles.successMessage}>{message}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>

      <div className={styles.gridContainer}>
        {products.map((product) => (
          <div key={product.id} className={styles.gridItem}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <h2 className={styles.productTitle}>{product.name}</h2>
            <p className={styles.productDescription}>{product.description}</p>
            <p className={styles.productPrice}>Price: ${product.price}</p>
            <p className={styles.productStock}>Stock: {product.stock}</p>
            <p className={styles.productCategory}>
              Category: {product.category}
            </p>
            <button
              className={styles.button}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverViewItems;
