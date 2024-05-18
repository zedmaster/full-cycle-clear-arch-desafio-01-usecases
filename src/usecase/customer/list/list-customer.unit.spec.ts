import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list-customer.usecase";

const customer1 = CustomerFactory.createWithAddress("Jhon Doe", new Address(
    "Rua 1",
    "1",
    "São Paulo",
    "SP",
    "12345678"
));

const customer2 = CustomerFactory.createWithAddress("Jane Doe", new Address(
    "Rua 2",
    "2",
    "São Paulo",
    "SP",
    "12345678"
));


const MockCustomerRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        find: jest.fn(),
    }
}

describe("Unit test list customer use case", () => {
    
        it("shoud list all customers", async () => {
            const customerRepository = MockCustomerRepository();
            const useCase = new ListCustomerUseCase(customerRepository);
            const input = {}
            const output = await useCase.execute(input);
    
            expect(output.customers).toHaveLength(2);
            expect(output.customers[0].name).toEqual(customer1.name);
            expect(output.customers[0].id).toEqual(customer1.id);
            expect(output.customers[0].address.street).toEqual(customer1.address.street);
            expect(output.customers[0].address.number).toEqual(customer1.address.number);
            expect(output.customers[0].address.city).toEqual(customer1.address.city);
            expect(output.customers[0].address.state).toEqual(customer1.address.state);
            expect(output.customers[0].address.zipCode).toEqual(customer1.address.zipCode);

            expect(output.customers[1].name).toEqual(customer2.name);
            expect(output.customers[1].id).toEqual(customer2.id);
            expect(output.customers[1].address.street).toEqual(customer2.address.street);
            expect(output.customers[1].address.number).toEqual(customer2.address.number);
            expect(output.customers[1].address.city).toEqual(customer2.address.city);
            expect(output.customers[1].address.state).toEqual(customer2.address.state);
            expect(output.customers[1].address.zipCode).toEqual(customer2.address.zipCode);
            
            
        })
})