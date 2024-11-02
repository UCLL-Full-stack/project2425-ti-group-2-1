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

export type AuthenticationRequest = {
    email : string,
    password : string
};

export type AuthenticationResponse = {
    id : number,
    email : string
};