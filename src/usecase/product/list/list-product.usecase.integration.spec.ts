import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infraestructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infraestructure/product/repository/sequelize/product.repository";
import ListProductsUseCase from "./list-products.usecase";


describe("List Product Use Case Integration test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            models: [ProductModel],
            logging: false
        });

        sequelize.addModels([ProductModel]);

        await sequelize.sync();
    })


    afterEach(async () => {
        await sequelize.close();
    })


    it("should list all products", async () => {
        const productRepository = new ProductRepository();
        const useCase = new ListProductsUseCase(productRepository);

        const listProps = {};
       
        const product1 = new Product("1", "Product1", 1);
        const product2 = new Product("2", "Product2", 2);
        await productRepository.create(product1);
        await productRepository.create(product2);

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