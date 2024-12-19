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
    token: string;
    email: string;
    name: string;
};

type ProductInput = {
    id? : number
    name : string;
    description : string;
    price : number;
    category : string;
    image : string;
    stock : number;    
}

export{
    CustomerInput,
    AddressInput,
    AuthenticationRequest,
    AuthenticationResponse,
    ProductInput,
}
