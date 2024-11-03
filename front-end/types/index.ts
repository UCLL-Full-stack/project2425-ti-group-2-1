export type AuthenticationRequest = {
   email: string;
   password: string;
}
  
export type AuthenticationResponse = {
   id : number;
   email: string;
}