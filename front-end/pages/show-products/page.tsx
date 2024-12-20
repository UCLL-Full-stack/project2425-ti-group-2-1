import { useState, useEffect } from "react";
import HomeService from "@/services/HomeService";
import OrderService from "@/services/OrderService";
import styles from "@/styles/Product.module.css";
import { useTranslation } from "next-i18next";

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
  const { t } = useTranslation();

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null); 
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await HomeService.handleGetProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        setError("Failed to fetch products");
      }
    };

    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const { email } = JSON.parse(loggedInUser);
      setUserEmail(email);
    } else {
      setError("You must be logged in to place an order.");
    }

    fetchProducts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      setMessage("");
      setError("");
      const updatedCart = [...prevCart, product];
      const newTotalPrice = updatedCart.reduce((sum, item) => sum + item.price, 0);
      setTotalPrice(newTotalPrice);
      return updatedCart;
    });
  };

  const handlePay = async () => {
    if (!userEmail) {
      setError("You must be logged in to place an order.");
      return;
    }

    const orderData = {
      email: userEmail,
      products: cart.map((item) => ({ id: item.id })),
      totalPrice: totalPrice,
    };

    try {
      const response = await OrderService.handleCreateOrder(orderData);
      setMessage("Order successfully placed!");
      setCart([]); 
      setTotalPrice(0);
    } catch (err) {
      setError("Failed to place the order.");
    }
  };

  return (
    <div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name or category"
          className={styles.searchInput}
        />
      </div>

      <div className={styles.rightBlock}>
        <h2 className={styles.ordertitle}>Shopping list</h2>
        <hr className={styles.line} />
        <div className={styles.verticalline}></div>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item, index) => (
              <li key={index} className={styles.listItem}>
                {item.name} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          <p>{t("product.cart")}</p>
        )}
        <div className={styles.afrekenen}>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
          <button
            className={styles.paybutton}
            onClick={handlePay}
            disabled={cart.length === 0}
          >
            {t("product.pay")}
          </button>
        </div>
        {message && <p className={styles.successMessage}>{message}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>

      <div className={styles.gridContainer}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default OverViewItems;
