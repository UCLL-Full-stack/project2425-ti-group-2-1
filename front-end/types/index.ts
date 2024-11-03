export type AuthenticationRequest = {
   email: string;
   password: string;
}
  
export type AuthenticationResponse = {
   id : number;
   email: string;
}

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
}