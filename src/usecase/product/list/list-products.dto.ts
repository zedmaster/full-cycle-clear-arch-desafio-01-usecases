export interface InputListProductsDTO {};

interface OutputProductDTO {
    id: string;
    name: string;
    price: number;
};

export interface OutputProductsDTO {
    products: OutputProductDTO[];
}