import database from "./database";

interface CreateOrderInput {
  email: string;
  products: { id: number }[]; 
  totalPrice: number; 
}

const createOrder = async (input: CreateOrderInput) => {
  const { email, products, totalPrice } = input;

  if (products.length === 0) {
    throw new Error("Order must include at least one product.");
  }

  try {
    // Fetch user and their default address
    const user = await database.customer.findUnique({
      where: { email },
      include: { address: true },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    if (!user.address) {
      throw new Error("User does not have a default address.");
    }

    const addressId = user.address.id;

    // Count occurrences of each product ID
    const productQuantities: { [key: number]: number } = {};

    products.forEach((product) => {
      if (productQuantities[product.id]) {
        productQuantities[product.id] += 1;
      } else {
        productQuantities[product.id] = 1;
      }
    });

    // Prepare the order products with their quantity
    const orderProducts = Object.keys(productQuantities).map((productId) => ({
      productId: parseInt(productId), // The product ID
      quantity: productQuantities[parseInt(productId)], // The quantity of this product in the order
    }));

    // Create the order
    const newOrder = await database.order.create({
      data: {
        totalprice: totalPrice,
        send: false,
        customerId: user.id,
        addressId,
      },
    });

    // Insert the products with the correct orderId and quantity into OrderProduct table
    const orderProductData = orderProducts.map((product) => ({
      orderId: newOrder.id, // Set the correct orderId for each order product
      productId: product.productId,
      quantity: product.quantity, // Set the quantity for each product
    }));

    // Insert the products into the OrderProduct table
    await database.orderProduct.createMany({
      data: orderProductData,
    });

    // Fetch the newly created order with the products
    const populatedOrder = await database.order.findUnique({
      where: { id: newOrder.id },
      include: {
        orderProducts: {
          include: {
            product: true, // Include product details in the response
          },
        },
      },
    });

    return populatedOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Unable to create order");
  }
};

export default { createOrder };
