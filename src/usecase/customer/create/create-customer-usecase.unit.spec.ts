import CreateCustomerUseCase from "./create-customer.usecase"



const MockCustomerRepository = ()=> {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test create customer use case", ()=> {
    it("should create a customer", async ()=>{
        const customerRepository = MockCustomerRepository()
        const useCase = new CreateCustomerUseCase(customerRepository)
        const input = {
            name: "John Doe",
            address:{
                street: "Rua 1",
                number: "1",
                city: "São Paulo",
                state: "SP",
                zipCode: "12345678"
            }
        }
        const ouput =  await useCase.execute(input);

        expect(ouput.id).toBeDefined();
        expect(ouput.name).toBe(input.name);
        expect(ouput.address).toEqual(input.address);

    });


    it("should throw an error when name is missing", async ()=> {
        const customerRepository = MockCustomerRepository()
        const useCase = new CreateCustomerUseCase(customerRepository)
        const input = {
            name: "",
            address:{
                street: "Rua 1",
                number: "1",
                city: "São Paulo",
                state: "SP",
                zipCode: "12345678"
            }
        }
        
        await expect(async ()=> useCase.execute(input)).rejects.toThrowError("Name is required");
    })

    it("should throw an error when street is missing", async ()=> {
        const customerRepository = MockCustomerRepository()
        const useCase = new CreateCustomerUseCase(customerRepository)
        const input = {
            name: "John Doe",
            address:{
                street: "",
                number: "1",
                city: "São Paulo",
                state: "SP",
                zipCode: "12345678"
            }
        }
        
        await expect(async ()=> useCase.execute(input)).rejects.toThrowError("Street is required");
    })
        
})