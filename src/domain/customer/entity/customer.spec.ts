import { Address } from '../value-object/address';
import { Customer } from './customer';
describe("Customer unit tests", () => {


    it("should throw error when id is empty", () => {
        expect(() => new Customer("", "Luan")).toThrowError("Id is required");
    })

    it("should add reward points", () => {
        const customer = new Customer("123", "Luan");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    })

    it("should throw error when name is empty", () => {
        expect(() => new Customer("123", "")).toThrowError("Name is required");
    })

    it("should change name", () => {
        let customer = new Customer("123", "Luan");
        customer.changeName("Silas");
        expect(customer.name).toBe("Silas");


    })


    it("should activate a customer", () => {
        let customer = new Customer("123", "Luan");
        const address = new Address("Rua 1", "123", "São Paulo", "SP", "12345678");
        customer.changeAddress(address);
        customer.activate();

        expect(customer.isActive()).toBe(true);
        
    })


    
    it("should deactivate a customer", () => {
        let customer = new Customer("123", "Luan");
        
        customer.deactivate();

        expect(customer.isActive()).toBe(false);
        
    })

    it("should throw an error when activate a customer without an address", () => {
        let customer = new Customer("123", "Luan");        
        expect(()=> customer.activate()).toThrowError("Address is mandatory to activate a customer");
        
    })


})