import database from '../repository/database';

interface CreateOrderInput {
    email: string;
    products: { id: number }[];
    totalPrice: number;
}

const createOrder = async (input: CreateOrderInput) => {
    const { email, products, totalPrice } = input;

    if (products.length === 0) {
        throw new Error('Order must include at least one product.');
    }

    try {
        const user = await database.customer.findUnique({
            where: { email },
            include: { address: true },
        });

        if (!user) {
            throw new Error('User not found.');
        }

        if (!user.address) {
            throw new Error('User does not have a default address.');
        }

        const addressId = user.address.id;

        // Count the occurrences of each productId
        const productQuantities: { [key: number]: number } = {};

        products.forEach((product) => {
            if (productQuantities[product.id]) {
                productQuantities[product.id] += 1;
            } else {
                productQuantities[product.id] = 1;
            }
        });

        // Prepare the order products with quantity
        const orderProducts = Object.keys(productQuantities).map((productId) => ({
            orderId: 0, // We'll assign the correct orderId later
            productId: parseInt(productId),
            quantity: productQuantities[parseInt(productId)],
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

        // Assign the orderId to the order products and insert them into the OrderProduct table
        await database.orderProduct.createMany({
            data: orderProducts.map((product) => ({
                orderId: newOrder.id, // Set the correct orderId
                productId: product.productId,
                quantity: product.quantity,
            })),
        });

        return newOrder;
    } catch (error) {
        throw new Error('Unable to create order');
    }
};

export default { createOrder };
