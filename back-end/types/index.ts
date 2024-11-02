type CustomerInput = {
    id?: number;
    name: string;
    password: string;
    email: string;
    number: string;
    address: AddressInput;
};

type AddressInput = {
    address_id?: number;
    housecode: string;
    street: string;
    postalcode: string;
};

export{
    CustomerInput,
    AddressInput,
}