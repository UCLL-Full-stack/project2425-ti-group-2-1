// services/addressService.ts
const updateAddress = async (
  email: string,
  street: string,
  housecode: string,
  postalcode: string
) => {
  try {
    const storedUser = localStorage.getItem("loggedInUser");
    const token = storedUser ? JSON.parse(storedUser).token : null;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/address/update-address`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          street,
          housecode,
          postalcode,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update address");
    }

    return await response.json();
  } catch (error) {
    throw new Error("Something went wrong while updating the address");
  }
};

const addressService = {
  updateAddress,
};

export default addressService;
