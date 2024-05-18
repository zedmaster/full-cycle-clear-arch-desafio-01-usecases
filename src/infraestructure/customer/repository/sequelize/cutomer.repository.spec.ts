import { Address } from './../../../../domain/customer/value-object/address';
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./customer.model";

import CustomerRepository from "./customer.repository";
import { Customer } from '../../../../domain/customer/entity/customer';

describe("Customer repository test", () => {


    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const address = new Address("Rua 1", "Bairro 1", "Cidade 1", "Estado 1", "12345678");
        const customer = new Customer("1", "Customer 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });
        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: address.street,
            number: address.number,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            rewardPoints: customer.rewardPoints,
            active: customer.isActive()
        })
    })

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const address = new Address("Rua 1", "Bairro 1", "Cidade 1", "Estado 1", "12345678");
        const customer = new Customer("1", "Customer 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        customer.changeName("Customer 2");
        customer.changeAddress( new Address("Rua 2", "Bairro 2", "Cidade 2", "Estado 2", "87654321"));

        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: customer.address.street,
            number: customer.address.number,
            city: customer.address.city,
            state: customer.address.state,
            zipCode: customer.address.zipCode,
            rewardPoints: customer.rewardPoints,
            active: customer.isActive()
        })


    })


    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const address = new Address("Rua 1", "Bairro 1", "Cidade 1", "Estado 1", "123456");
        const customer = new Customer("1", "Customer 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerFound = await customerRepository.find("1");

        expect(customerFound).toStrictEqual(customer);

    })

    it("should throw an error when customer not found", async () => {
        const customerRepository = new CustomerRepository();
        await expect(async ()=> {
           await customerRepository.find("1")
        }).rejects.toThrow("Customer not found");
    })

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const address1 = new Address("Rua 1", "Bairro 1", "Cidade 1", "Estado 1", "123456");
        const customer1 = new Customer("1", "Customer 1");
        customer1.changeAddress(address1);

        customer1.addRewardPoints(10);

        const address2 = new Address("Rua 2", "Bairro 2", "Cidade 2", "Estado 2", "123456");
        const customer2 = new Customer("2", "Customer 2");
        customer2.changeAddress(address2);
        customer2.addRewardPoints(20);
        customer2.activate();


        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const expectedCustomers = [customer1, customer2];

        const customers = await customerRepository.findAll();

        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer2);
    })




})