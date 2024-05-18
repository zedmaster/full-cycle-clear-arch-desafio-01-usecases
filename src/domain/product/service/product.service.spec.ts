import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {

    it('shoud change the prices of all products', () => {
        
        const product1 = new Product("1", "Product 1", 100);
        const product2 = new Product("2", "Product 2", 200);
        const products = ProductService.increasePrice([product1, product2], 100);
        expect(products[0].price).toBe(200);
        expect(products[1].price).toBe(400);
        
    })
})