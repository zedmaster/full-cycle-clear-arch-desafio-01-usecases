import { InputListCustomerDto, OutputListCustomerDto } from './list-customer.dto';
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { Customer } from '../../../domain/customer/entity/customer';

export default class ListCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.customerRepository.findAll();
        return OutputMapper.map(customers);
    }

}

class OutputMapper{
    static map(customers: Customer[]): OutputListCustomerDto {

        return {
            customers: customers.map(customer => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.address.street,
                    number: customer.address.number,
                    city: customer.address.city,
                    state: customer.address.state,
                    zipCode: customer.address.zipCode
                }
            }))
        }
        
        
    }
}