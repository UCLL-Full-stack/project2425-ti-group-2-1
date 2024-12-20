const OrderService = {
  handleCreateOrder: async (orderData: {
    email: string;
    products: { id: number }[];
    totalPrice: number;
  }) => {
    const storedUser = localStorage.getItem("loggedInUser");
    const token = storedUser ? JSON.parse(storedUser).token : null;

    try {
      console.log("Order Data being sent to backend:", orderData);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },
};

export default OrderService;
