import { Product } from "../../model/Product";

test('Given: valid values for Product, when: creating new Product, then: new Product is created', () => {
        const name = "vodka";
        const description = "37,5%, made with potatoes";
        const price = 15;
        const category = "alchohol";

    const product = new Product(name, description, price, category);

    expect(product.name).toBe(name);
    expect(product.description).toBe(description);
    expect(product.price).toBe(price);
    expect(product.category).toBe(category);
});