import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductsDTO, OutputProductsDTO } from "./list-products.dto";


export default class ListProductsUseCase {
    constructor(private productRepository: ProductRepositoryInterface) { }

    
    async execute(input: InputListProductsDTO): Promise<OutputProductsDTO> {

        const products = await this.productRepository.findAll();

        return {
            products: products.map((product) => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price
                }
            })
        };

    }
}