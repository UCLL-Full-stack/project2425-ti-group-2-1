import { AuthenticationRequest, AuthenticationResponse } from "../types";

async function handleLogin(
  credentials: AuthenticationRequest
): Promise<AuthenticationResponse> {
  try {
    console.log(credentials);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/customers/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unauthorized");
      }
      throw new Error("Network response was not ok");
    }

    const data: AuthenticationResponse = await response.json();
    console.log(data);

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({
        token: data.token,
        name: data.name,
        email: data.email,
        role: data.role,
      })
    );

    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const { role } = JSON.parse(loggedInUser);
      if (role === "banned") {
        localStorage.removeItem("loggedInUser");
        alert("You have been banned.");
      }
    }

    return data;
  } catch (error) {
    console.error("Error in login service:", error);
    throw error;
  }
}

const loginService = {
  handleLogin,
};

export default loginService;
