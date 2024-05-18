import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infraestructure/product/repository/sequelize/product.model';
import ProductRepository from "../../../infraestructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create-product.usecase";


describe("Create Product Use case Integration test",()=>{

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            models: [ProductModel],
            logging: false
        });

        await sequelize.sync();
    })

    
    afterEach(async () => {
        await sequelize.close();
    })


    it("should create a product", async () => {
        const input = {
            name: "Product 1",
            price: 10
        }

        const productRepository = new ProductRepository();
        const useCase = new CreateProductUseCase(productRepository);
        const output = await useCase.execute(input);

        expect(output.id).toBeDefined();
        expect(input.name).toBe(output.name);
        expect(input.price).toBe(output.price);


    })
})