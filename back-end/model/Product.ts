export class Product {
    product_id?: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    stock: number;
  
    constructor(name: string, description: string, price: number, category: string, image: string, stock: number) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.image = image;
        this.stock = stock;
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
        return this.product_id;
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
}
  