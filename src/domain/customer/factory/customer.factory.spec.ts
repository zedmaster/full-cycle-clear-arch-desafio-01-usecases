import { Address } from './../value-object/address';
import { Customer } from './../entity/customer';
import CustomerFactory from './customer.factory';
describe("CUSTOMER FACTORY UNIT TESTS", () => {

    it("should create a customer", () => {
        let customer = CustomerFactory.create("Jhon");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Jhon");
        expect(customer.constructor.name).toBe("Customer");
        expect(customer.address).toBeUndefined();
    })

    it("should create a customer whit an address",()=>{
        const address = new Address("Rua 1", "123", "City", "State", "12345678");
        let customer = CustomerFactory.createWithAddress("Jhon", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Jhon");
        expect(customer.constructor.name).toBe("Customer");
        expect(customer.address).toBeDefined();
        expect(customer.address.street).toBe("Rua 1");
        expect(customer.address.number).toBe("123");
        expect(customer.address.city).toBe("City");
        expect(customer.address.state).toBe("State");
        expect(customer.address.zipCode).toBe("12345678");
    })
})