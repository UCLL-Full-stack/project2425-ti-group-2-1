export type AuthenticationRequest = {
  email: string;
  password: string;
};

export type AuthenticationResponse = {
  token: string;
  email: string;
  name: string;
  role: Role;
};

export type UserData = {
  name: string;
  password: string;
  email: string;
  number: string;
  role?: Role;
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

export type Role = "admin" | "klant" | "banned";
