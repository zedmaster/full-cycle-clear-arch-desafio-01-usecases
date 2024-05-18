import { v4 } from "uuid";
import Product from "./product";
import ProductB from "./product-b";
import ProductInterface from "./product.interface";

export default class ProductFactory {
    static create(type: string, name: string, price: number): ProductInterface {
        const id = v4();
        switch (type) {
            case "a":
                return new Product(id, name, price);
            case "b":
                return new ProductB(id, name, price);
            default:
                throw new Error("Invalid type");
        }
    }
}