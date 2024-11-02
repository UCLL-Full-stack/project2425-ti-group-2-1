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

type AuthenticationRequest = {
    email : string,
    password : string
};

type AuthenticationResponse = {
    id : number,
    email : string
};

export{
    CustomerInput,
    AddressInput,
    AuthenticationRequest,
    AuthenticationResponse,
}
