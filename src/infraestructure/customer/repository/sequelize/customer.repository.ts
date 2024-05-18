import { Address } from '../../../../domain/customer/value-object/address';

import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import CustomerModel from "./customer.model";
import { Customer } from '../../../../domain/customer/entity/customer';

export default class CustomerRepository implements CustomerRepositoryInterface {


    async create(entity: Customer): Promise<void> {
       await CustomerModel.create({
              id: entity.id,
                name: entity.name,
                street: entity.address.street,
                number: entity.address.number,
                city: entity.address.city,
                state: entity.address.state,
                zipCode: entity.address.zipCode,
                active: entity.isActive(),
                rewardPoints: entity.rewardPoints
        })
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            city: entity.address.city,
            state: entity.address.state,
            zipCode: entity.address.zipCode,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
        }, {
            where: {
                id: entity.id
            }
        })
    }
    async find(id: string): Promise<Customer> {
        let customerModel;
        try{

            customerModel = await CustomerModel.findOne({
                where: { id: id },
                rejectOnEmpty: true
            });
        } catch (error) {
            throw new Error("Customer not found");
        }

        

        const address = new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.state, customerModel.zipCode);
        const customer = new Customer(customerModel.id, customerModel.name);
        customer.changeAddress( address);
        customer.addRewardPoints(customerModel.rewardPoints);
        if (customerModel.active) {
            customer.activate();
        }

        return customer;

    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
        const customers: Customer[] = [];
        for (const customerModel of customerModels) {
            const address = new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.state, customerModel.zipCode);
            const customer = new Customer(customerModel.id, customerModel.name);
            customer.changeAddress(address);
            customer.addRewardPoints(customerModel.rewardPoints);
            if (customerModel.active) {
                customer.activate();
            }
            customers.push(customer);
        }
        return customers;
    }
}