import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update-customer.usecase";

const customer = CustomerFactory.createWithAddress("Jhon Doe", new Address(
    "Rua 1",
    "1",
    "São Paulo",
    "SP",
    "12345678"
));

const input = {
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


const MockCustomerRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    }
}

describe("Unit test update customer use case", () => {

    it("shoud update a customer", async () => {
        const customerRepository = MockCustomerRepository();
        const useCase = new UpdateCustomerUseCase(customerRepository);
        const ouput = await useCase.execute(input);

        expect(input).toEqual(ouput);
    })
})