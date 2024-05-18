import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update-product.usecase";


const MockProductRepository = () => ({
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
});


describe("Update Product Use Case test", () => {

    it("should update product", async () => {
        const input = {
            id: "1",
            name: "Product1",
            price: 10
        }

        const productRepository = MockProductRepository();
        const useCase = new UpdateProductUseCase(productRepository);
        const product = new Product(input.id, "Description", 1);

        productRepository.find.mockResolvedValue(product);

        const output = await useCase.execute(input);

        expect(input.id).toBe(output.id);
        expect(input.name).toBe(output.name);
        expect(input.price).toBe(output.price);

    })
})