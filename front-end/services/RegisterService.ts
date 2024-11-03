import { AuthenticationRequest, AuthenticationResponse, UserData } from "../types";

async function handleRegister(
	credentials: UserData
): Promise<UserData> {
    try {
        console.log(credentials)
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/customers/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        console.log(credentials)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data: UserData = await response.json();
        console.log(data);
        return data;       
    } catch (error) {
        console.error('Error in register service:', error);
        throw error;
    }
};

const registerService = {
  handleRegister,
};

export default registerService;
