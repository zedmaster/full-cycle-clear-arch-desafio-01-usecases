import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find-product";


const MockProductRepository = ()=>{
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}


describe("Find Product Use Case test", () => {

    it("should find product", async () => {
        const productRepository = MockProductRepository();
        const useCase = new FindProductUseCase(productRepository);
        const product = new Product("1", "Product1", 100);

        productRepository.find.mockResolvedValue(product);

        const inputFindProduct ={
            id: "1"
        }

        const output = await useCase.execute(inputFindProduct);


        expect(output.id).toBe(product.id);
        expect(output.name).toBe(product.name);
        expect(output.price).toBe(product.price);

    });
})