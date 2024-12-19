export type AuthenticationRequest = {
  email: string;
  password: string;
};

export type AuthenticationResponse = {
  token: string;
  email: string;
  name: string;
};

export type UserData = {
  name: string;
  password: string;
  email: string;
  number: string;
  address: {
    housecode: string;
    street: string;
    postalcode: string;
  };
};

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
};
