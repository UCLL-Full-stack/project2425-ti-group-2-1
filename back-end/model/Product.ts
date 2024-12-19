import { Product as ProductPrisma } from '@prisma/client';

export class Product {
    private id?: number;
    private name: string;
    private description: string;
    private price: number;
    private category: string;
    private image: string;
    private stock: number;

    constructor(product: {
        id?: number;
        name: string;
        description: string;
        price: number;
        category: string;
        image: string;
        stock: number;
    }) {
        this.validate(product);
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.category = product.category;
        this.image = product.image;
        this.stock = product.stock;
    }

    private validate(product: {
        id?: number;
        name: string;
        description: string;
        price: number;
        category: string;
        image: string;
        stock: number;
    }): void {
        if (!product.name) {
            throw new Error('Name is required');
        }

        if (!product.description) {
            throw new Error('Description is required');
        }

        if (product.price === undefined || product.price < 0) {
            throw new Error('Price must be a non-negative number');
        }

        if (!product.category) {
            throw new Error('Category is required');
        }

        if (!product.image) {
            throw new Error('Image is required');
        }

        if (product.stock === undefined || product.stock < 0) {
            throw new Error('Stock must be a non-negative number');
        }
    }

    getimage(): string {
        return this.image;
    }

    setimage(value: string) {
        this.image = value;
    }

    getstock(): number {
        return this.stock;
    }

    setstock(value: number) {
        if (value < 0) {
            throw new Error('Stock cannot be negative.');
        }
        this.stock = value;
    }

    getproductid(): number | undefined {
        return this.id;
    }

    getname(): string {
        return this.name;
    }

    setname(value: string) {
        if (!value.trim()) {
            throw new Error('Name cannot be empty.');
        }
        this.name = value;
    }

    getdescription(): string {
        return this.description;
    }

    setdescription(value: string) {
        if (!value.trim()) {
            throw new Error('Description cannot be empty.');
        }
        this.description = value;
    }

    getprice(): number {
        return this.price;
    }

    setprice(value: number) {
        if (value < 0) {
            throw new Error('Price cannot be negative.');
        }
        this.price = value;
    }

    getcategory(): string {
        return this.category;
    }

    setcategory(value: string) {
        if (!value.trim()) {
            throw new Error('Category cannot be empty.');
        }
        this.category = value;
    }

    equals(product: Product): boolean {
        return (
            this.id === product.getproductid() &&
            this.name === product.getname() &&
            this.description === product.getdescription() &&
            this.price === product.getprice() &&
            this.category === product.getcategory() &&
            this.image === product.getimage() &&
            this.stock === product.getstock()
        );
    }

    static from({ id, name, description, price, stock, category, image }: ProductPrisma) {
        return new Product({
            id,
            name,
            description,
            price,
            stock,
            category,
            image,
        });
    }
}
