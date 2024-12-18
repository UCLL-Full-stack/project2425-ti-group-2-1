import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createProduct = async () => {
  try {
    const product = await prisma.product.create({
      data: {
        name: "Wireless Bluetooth Headphones",
        description: "High-quality wireless Bluetooth headphones with noise cancellation.",
        price: 99.99,
        category: "Electronics",
        image: "https://praktijkdewaterlely.nl/wp-content/uploads/2020/02/Alcohol-scaled.jpg",
        stock: 150,
      },
    });
    console.log("Product created:", product);
  } catch (error) {
    console.error("Error creating product:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createProduct();
