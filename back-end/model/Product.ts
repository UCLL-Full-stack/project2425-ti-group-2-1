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
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.category = product.category;
        this.image = product.image;
        this.stock = product.stock;
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
        this.stock = value;
    }

    getproductid(): number | undefined {
        return this.id;
    }
    
    getname(): string {
        return this.name;
    }
    
    setname(value: string) {
        this.name = value;
    }
    
    getdescription(): string {
        return this.description;
    }
    
    setdescription(value: string) {
        this.description = value;
    }
    
    getprice(): number {
        return this.price;
    }
    
    setprice(value: number) {
        if (value >= 0) {
            this.price = value;
        } else {
            throw new Error("Price cannot be negative.");
        }
    }
    
    getcategory(): string {
        return this.category;
    }
    
    setcategory(value: string) {
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

    static from({
        id,
        name,
        description,
        price,
        stock,
        category,
        image,        
    }: ProductPrisma) {
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
  