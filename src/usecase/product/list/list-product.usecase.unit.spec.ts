import Product from "../../../domain/product/entity/product";
import ListProductsUseCase from "./list-products.usecase";


const MockProductRepository = ()=>{
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}

describe("List Product Use Case test", () => {

    it("should list all products", async () => {
        const productRepository = MockProductRepository();
        const useCase = new ListProductsUseCase(productRepository);
        const listProps = {};

        const product1 = new Product("1", "Product1", 1);
        const product2 = new Product("2", "Product2", 2);

        productRepository.findAll.mockResolvedValue([product1, product2]);

        const output = await useCase.execute(listProps);

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
  
    })
})