export class Product {
    product_id: number;
    name: string;
    description: string;
    price: number;
    category: string;
  
    constructor(productid: number, name: string, description: string, price: number, category: string) {
        this.product_id = productid;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
    }

    getproductid(): number {
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
  