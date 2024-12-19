const handleGetProducts = async () => {
  const storedUser = localStorage.getItem("loggedInUser");
  const token = storedUser ? JSON.parse(storedUser).token : null;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch feedbacks.");
  }

  return response.json();
};

const homeService = {
    handleGetProducts,
};
export default homeService;
