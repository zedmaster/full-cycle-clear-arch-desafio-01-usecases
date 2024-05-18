import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";

interface InputInterface {
    id: string;
}
interface OutputInterface {
    id: string;
    name: string;
    address: {
        street: string;
        number: string;
        city: string;
        state: string;
        zipCode: string;
    }
}

export default class FindCustomerUseCase {

    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository : CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }   

    async execute(input: InputInterface) : Promise<OutputInterface> {

        const customer =  await this.customerRepository.find(input.id);

        return {
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

    }
}