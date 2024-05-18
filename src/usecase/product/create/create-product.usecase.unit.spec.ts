import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "./create-product.usecase";


const MockProductRepository = ()=>{
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}


describe("Create Product Use Case", () => {

    it("should create product", async () => {
        const input = {
            name: "Product1",
            price: 10
        }

        const productRepository = MockProductRepository();
        const useCase = new CreateProductUseCase(productRepository);
      
        const output = await useCase.execute(input);

        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.price).toBe(input.price);
    })


    it("should throw error when name is missing", async () => {
        const input = {
            name: "",
            price: 10
        }

        const productRepository = MockProductRepository();
        const useCase = new CreateProductUseCase(productRepository);

        await expect(async ()=> useCase.execute(input)).rejects.toThrowError("Name is required");
    })


    it("should throw error when price less than zero", async () => {
        const input = {
            name: "Product1",
            price: -1
        }

        const productRepository = MockProductRepository();
        const useCase = new CreateProductUseCase(productRepository);

        await expect(async ()=> useCase.execute(input)).rejects.toThrowError("Price must be greater than 0");
    })

})