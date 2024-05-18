export interface InputUpdateCustomerDto {
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

export interface OutputUpdateCustomerDto {
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