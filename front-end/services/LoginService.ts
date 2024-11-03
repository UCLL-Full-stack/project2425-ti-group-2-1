import { AuthenticationRequest, AuthenticationResponse } from "../types";

async function handleLogin(
	credentials: AuthenticationRequest
): Promise<AuthenticationResponse> {
    try {
        console.log(credentials)
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/customers/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data: AuthenticationResponse = await response.json(); 
        console.log(data);
        return data;       
    } catch (error) {
        console.error('Error in login service:', error);
        throw error;
    }
};

const loginService = {
  handleLogin,
};

export default loginService;
