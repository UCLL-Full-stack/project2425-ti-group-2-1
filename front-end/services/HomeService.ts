const handleGetProducts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
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