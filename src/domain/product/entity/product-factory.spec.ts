import ProductFactory from "./product-factory";

describe("Product factory unit tests", () => {

    it("should create a product type a", () => {
        const product = ProductFactory.create("a", "Product A", 10);
        expect(product.id).toBeDefined;
        expect(product.price).toBe(10);
        expect(product.name).toBe("Product A");
        expect(product.constructor.name).toBe("Product")
    })

    it("should create a product type b", () => {
        const product = ProductFactory.create("b", "Product B", 10);
        expect(product.id).toBeDefined;
        expect(product.price).toBe(20);
        expect(product.name).toBe("Product B");
        expect(product.constructor.name).toBe("ProductB")
    })

    it("should throw an error when type is invalid", () => {
        expect(() => ProductFactory.create("c", "Product C", 10)).toThrowError("Invalid type");
    })
})