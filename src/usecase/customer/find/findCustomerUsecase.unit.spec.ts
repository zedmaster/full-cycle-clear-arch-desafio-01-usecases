import { Sequelize } from "sequelize-typescript";
import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infraestructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infraestructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find-customer.usecase";



const MockCustomerRepository = ()=> {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}

describe("Find Customer UseCase integration test", ()=>{


    it("should find a customer", async ()=>{


        const customer = new Customer("12345678901", "João da Silva");
        customer.changeAddress(new Address("Rua 1", "Bairro 1", "Cidade 1", "Estado 1", "Zip"));
        
        const customerRepository = MockCustomerRepository();
        customerRepository.find.mockReturnValue(customer);

        const expectedCustomerFound = {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number,
                city: customer.address.city,
                state: customer.address.state,
                zipCode: customer.address.zipCode
            }
        } 

        const input = { id: customer.id};
        const customerUseCase = new FindCustomerUseCase(customerRepository);
        const customerFound = await customerUseCase.execute(input);
        expect(customerFound).toEqual(expectedCustomerFound);
    })

    it("should throw an error when customer not found", async ()=>{
            
            const customerRepository = MockCustomerRepository();
            customerRepository.find.mockImplementation(()=>{
                throw new Error("Customer not found");
            });
    
            const input = { id: "12345678901"};
            const customerUseCase = new FindCustomerUseCase(customerRepository);
            await expect(customerUseCase.execute(input)).rejects.toThrowError("Customer not found");
    })
        
})